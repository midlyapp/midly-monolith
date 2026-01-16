import { Injectable } from '@nestjs/common'
import { hash as argonHash, verify } from 'argon2'

import { RedisKeys } from '@/infrastructure/redis/redis.keys'
import { RedisService } from '@/infrastructure/redis/redis.service'
import { randomBytesAsync, randomIntAsync } from '@/libs/utils'

import { OtpAuthLayer } from './types'

@Injectable()
export class OtpService {
	constructor(private readonly redis: RedisService) {}

	public async create(identifier: string, naming: OtpAuthLayer) {
		const { code, hash } = await this.generate()
		const key = RedisKeys[`${naming}`](identifier)
		await this.redis.hset(key, {
			attempts: 1,
			hash
		})
		await this.redis.expire(key, 60 * 30)
		await this.redis.hexpire(key, 300, 'FIELDS', 1, 'hash')

		return { code }
	}

	public async recreate(identifier: string, naming: OtpAuthLayer) {
		const key = RedisKeys[`${naming}`](identifier)
		const { attempts } = await this.checkErrors(key, true, true)

		const { code, hash } = await this.generate()

		await this.redis.hmset(key, {
			attempts: attempts + 1,
			hash
		})
		await this.redis.hexpire(key, 300, 'FIELDS', 1, 'hash')

		return { code }
	}

	public async validate(
		identifier: string,
		code: string,
		naming: OtpAuthLayer
	) {
		const key = RedisKeys[`${naming}`](identifier)
		const { hash } = await this.checkErrors(key, true, true, true)

		const isValid = await verify(hash, code)

		if (!isValid) {
			throw new Error('Неверный код.')
		}

		await this.redis.del(identifier)
		return await this.createToken(identifier, naming)
	}

	public async createToken(identifier: string, naming: OtpAuthLayer) {
		const token = await randomBytesAsync(32)

		let key: string
		if (naming === 'otpAuthSignUp')
			key = RedisKeys.authSignUpToken(identifier)
		if (naming === 'otpAuthRecovery')
			key = RedisKeys.authRecoveryToken(identifier)

		await this.redis.set(key, token, 'EX', 300)

		return {
			token
		}
	}

	public async verifyToken(
		identifier: string,
		token: string,
		naming: OtpAuthLayer
	): Promise<boolean> {
		let key: string
		if (naming === 'otpAuthSignUp')
			key = RedisKeys.authSignUpToken(identifier)
		if (naming === 'otpAuthRecovery')
			key = RedisKeys.authRecoveryToken(identifier)
		const storedToken = await this.redis.get(key)

		if (!storedToken) {
			throw new Error('Превышен лимит ожидания.')
		}

		if (storedToken !== token) {
			throw new Error(
				'Произошла ошибка. Попробуйте зарегистрироваться позднее.'
			)
		}

		return true
	}

	private async checkErrors(
		key: string,
		_isKeyExpired: boolean = true,
		_attempts: boolean = true,
		_isFieldExpired: boolean = false
	) {
		const isKeyExists = await this.redis.exists(key)

		if (!isKeyExists) {
			throw new Error(
				'Время отправки кода превысило лимит. Пожалуйста, воспользуйтесь другим методом регистрации.'
			)
		}

		let [receivedAttempts, receivedHash] = await this.redis.hmget(
			key,
			'attempts',
			'hash'
		)

		const attempts = parseInt(receivedAttempts)

		if (attempts >= 3) {
			throw new Error(
				'Количество отправок кода превысило лимит. Пожалуйста, воспользуйтесь другим методом регистрации.'
			)
		}

		if (!receivedHash) {
			throw new Error('Код истек.')
		}

		return {
			attempts,
			hash: receivedHash
		}
	}

	private async generate() {
		const code = await randomIntAsync(100000, 999999)
		const hash = await argonHash(code)
		return { code, hash }
	}
}
