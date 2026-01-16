import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Res
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { Response } from 'express'

import { AllEnvConfigs, getRefreshTokenConfig } from '@/config'

import type { SignInRequest } from '../dto/requests'
import { AuthCoreService } from '../services'
import { SignInSwagger } from '../swagger'
import type { JwtTokens } from '../types/jwtTokens.type'

@Controller('auth')
export class AuthSignInController {
	constructor(
		private readonly coreService: AuthCoreService,
		private readonly configService: ConfigService<AllEnvConfigs>
	) {}

	@SignInSwagger()
	@HttpCode(HttpStatus.OK)
	@Post('signin')
	async signIn(
		@Body() data: SignInRequest,
		@Res({ passthrough: true }) res: Response
	): Promise<Pick<JwtTokens, 'accessToken'>> {
		const { accessToken, refreshToken } =
			await this.coreService.signIn(data)

		res.cookie(
			'refreshToken',
			refreshToken,
			getRefreshTokenConfig(this.configService)
		)
		return { accessToken }
	}
}
