import { Injectable } from '@nestjs/common'

import { OtpService } from '@/modules/otp/otp.service'
import type { OtpAuthLayer } from '@/modules/otp/types'
import { UsersRepository } from '@/modules/users/users.repository'

import type { SendCodeRequest, ValidateCodeRequest } from '../dto/requests'

@Injectable()
export class AuthCodesService {
	constructor(
		private readonly userRepository: UsersRepository,
		private readonly otpService: OtpService
	) {}

	public async sendCode(data: SendCodeRequest, entity: OtpAuthLayer) {
		const { identifier } = data

		const isUserDefined = await this.userRepository.findByEmail(identifier)
		if (isUserDefined) throw new Error('Redirect to sign in')

		const { code } = await this.otpService.create(identifier, entity)

		//Notification

		return {
			ok: true
		}
	}

	public async validateCode(data: ValidateCodeRequest, entity: OtpAuthLayer) {
		const { identifier, code } = data

		const isUserDefined = await this.userRepository.findByEmail(identifier)
		if (isUserDefined) throw new Error('Redirect to sign in')

		const { token } = await this.otpService.validate(
			identifier,
			code.toString(),
			entity
		)

		return {
			token
		}
	}

	public async resendCode(data: SendCodeRequest, entity: OtpAuthLayer) {
		const { identifier } = data

		const isUserExist = await this.userRepository.findByEmail(identifier)
		if (isUserExist) throw new Error('Redirect to sign in')

		const { code } = await this.otpService.recreate(identifier, entity)

		//Notification

		return {
			ok: true
		}
	}
}
