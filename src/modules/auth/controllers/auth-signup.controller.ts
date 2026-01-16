import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Param,
	Post
} from '@nestjs/common'

import type {
	SendCodeRequest,
	SignUpRequest,
	ValidateCodeRequest
} from '../dto/requests'
import { AuthCodesService, AuthCoreService } from '../services'
import {
	ResendOtpSwagger,
	SendOtpSwagger,
	SignUpSwagger,
	ValidateOtpSwagger
} from '../swagger'

@Controller('auth')
export class AuthSignUpController {
	constructor(
		private readonly codeService: AuthCodesService,
		private readonly coreService: AuthCoreService
	) {}

	@SendOtpSwagger()
	@HttpCode(HttpStatus.CREATED)
	@Post('otp/send')
	async signUpSendOTP(@Body() data: SendCodeRequest) {
		return await this.codeService.sendCode(data, 'otpAuthSignUp')
	}

	@ValidateOtpSwagger()
	@HttpCode(HttpStatus.OK)
	@Post('otp/validate')
	async signUpValidateOTP(@Body() data: ValidateCodeRequest) {
		return await this.codeService.validateCode(data, 'otpAuthSignUp')
	}

	@ResendOtpSwagger()
	@HttpCode(HttpStatus.OK)
	@Post('otp/resend')
	async signUpResendOTP(@Body() data: SendCodeRequest) {
		return await this.codeService.resendCode(data, 'otpAuthSignUp')
	}

	@SignUpSwagger()
	@HttpCode(HttpStatus.CREATED)
	@Post('signup')
	async signUp(
		@Body() data: SignUpRequest,
		@Param('registration_token') token: string
	): Promise<void> {
		return await this.coreService.signUp(token, data)
	}
}
