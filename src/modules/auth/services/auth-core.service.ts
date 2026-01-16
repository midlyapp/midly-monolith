import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { hash, verify } from 'argon2'

import { OtpService } from '@/modules/otp/otp.service'
import { UsersRepository } from '@/modules/users/users.repository'

import type {
	RecoverySetRequest,
	SignInRequest,
	SignUpRequest
} from '../dto/requests'
import { JwtTokens } from '../types/jwtTokens.type'

import { AuthTokensService } from './auth-tokens.service'

@Injectable()
export class AuthCoreService {
	constructor(
		private readonly userRepository: UsersRepository,
		private readonly otpService: OtpService,
		private readonly tokensService: AuthTokensService
	) {}

	public async signUp(token: string, data: SignUpRequest): Promise<void> {
		const { identifier, name, password } = data

		const isUserExist = await this.userRepository.findByEmail(identifier)
		if (isUserExist) throw new ConflictException('Redirect to sign in')

		await this.otpService.verifyToken(identifier, token, 'otpAuthSignUp')

		const hashedPassword = await hash(password)

		await this.userRepository.createAccount({
			email: identifier,
			name,
			password: hashedPassword,
			isEmailVerified: true
		})
	}

	public async signIn(data: SignInRequest): Promise<JwtTokens> {
		const { identifier, password } = data

		const existingUser = await this.userRepository.findByEmail(identifier)
		if (!existingUser) {
			throw new NotFoundException(
				'Пользователь не найден. Пожалуйста, проверьте введенные данные'
			)
		}

		const isValidPassword = await verify(existingUser.password, password)

		if (!isValidPassword) {
			throw new UnauthorizedException('Неверно введенные данные.')
		}
		const payload = { sub: existingUser.id, username: existingUser.name }

		return await this.tokensService.generateTokens(payload)
	}

	public async recoverySet(
		token: string,
		data: RecoverySetRequest
	): Promise<void> {
		const { identifier, password } = data

		const isUserExist = await this.userRepository.findByEmail(identifier)
		if (isUserExist) throw new ConflictException('Redirect to sign in')

		await this.otpService.verifyToken(identifier, token, 'otpAuthRecovery')

		const hashedPassword = await hash(password)

		await this.userRepository.updateAccount(isUserExist.id, {
			password: hashedPassword
		})
	}
}
