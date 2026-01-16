import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { Response } from 'express'

import { RefreshToken } from '@/common/decorators'
import { AllEnvConfigs, getRefreshTokenConfig } from '@/config'

import { AuthTokensService } from '../services'
import { RefreshJwtSwagger, SignOutSwagger } from '../swagger'
import type { RequestWithUser } from '../types'
import { JwtTokens } from '../types/jwtTokens.type'

@Controller('auth')
export class AuthTokensController {
	constructor(
		private readonly tokensService: AuthTokensService,
		private readonly configService: ConfigService<AllEnvConfigs>
	) {}

	@SignOutSwagger()
	@RefreshToken()
	@Post('signout')
	@HttpCode(HttpStatus.OK)
	public async logout(
		@Req() req: RequestWithUser,
		@Res({ passthrough: true }) res: Response
	) {
		const { id, refreshToken } = req.user

		await this.tokensService.revokeToken(id, refreshToken)

		res.cookie('refreshToken', '', {
			httpOnly: true,
			secure: this.configService.get('cookies.cookie_secure', {
				infer: true
			}),
			domain: this.configService.get('cookies.cookie_domain', {
				infer: true
			}),
			sameSite: 'lax',
			expires: new Date(0)
		})

		return { ok: true }
	}

	@RefreshJwtSwagger()
	@RefreshToken()
	@HttpCode(HttpStatus.OK)
	@Get('refresh/jwt')
	async refresh(
		@Req() req: RequestWithUser,
		@Res({ passthrough: true }) res: Response
	): Promise<Pick<JwtTokens, 'accessToken'>> {
		const { id, refreshToken: rt } = req.user

		const { accessToken, refreshToken } =
			await this.tokensService.refreshTokens(id, rt)

		res.cookie(
			'refreshToken',
			refreshToken,
			getRefreshTokenConfig(this.configService)
		)

		return { accessToken }
	}
}
