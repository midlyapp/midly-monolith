import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Param,
	Post
} from '@nestjs/common'

import type {
	RecoverySetRequest,
	SendCodeRequest,
	ValidateCodeRequest
} from '../dto/requests'
import { AuthCodesService, AuthCoreService } from '../services'
import {
	RecoveryResendSwagger,
	RecoverySendSwagger,
	RecoverySetSwagger,
	RecoveryValidateSwagger
} from '../swagger'

@Controller('auth/recovery')
export class AuthRecoveryController {
	constructor(
		private readonly codeService: AuthCodesService,
		private readonly coreService: AuthCoreService
	) {}

	@RecoverySendSwagger()
	@HttpCode(HttpStatus.CREATED)
	@Post('send')
	async recoverySend(@Body() data: SendCodeRequest) {
		return await this.codeService.sendCode(data, 'otpAuthRecovery')
	}

	@RecoveryValidateSwagger()
	@HttpCode(HttpStatus.OK)
	@Post('validate')
	async recoveryValidate(@Body() data: ValidateCodeRequest) {
		return await this.codeService.validateCode(data, 'otpAuthRecovery')
	}

	@RecoveryResendSwagger()
	@HttpCode(HttpStatus.OK)
	@Post('resend')
	async recoveryResend(@Body() data: SendCodeRequest) {
		return await this.codeService.resendCode(data, 'otpAuthRecovery')
	}

	@RecoverySetSwagger()
	@HttpCode(HttpStatus.OK)
	@Post('set')
	async recoverySet(
		@Body() data: RecoverySetRequest,
		@Param('recovery_token') token: string
	) {
		return await this.coreService.recoverySet(token, data)
	}
}
