import { BadRequestException, Controller, Get, Param, Query, Req, Res } from "@nestjs/common"
import type { Response } from "express"
import { OAuthService } from "../services/auth-oauth.service"
import { ApiOperation } from "@nestjs/swagger"


@Controller('auth')
export class AuthOAuthController {
    constructor(
        private readonly oauthService: OAuthService
    ) {}

	@ApiOperation({
				summary: 'OAuth CallBack',
				description:
					'User requested to resend verification code to given earlier identifier (email) for passport recovery.'
			})
    @Get('/oauth/callback/:provider')
	public async callback(
		@Res({ passthrough: true }) res: Response,
		@Query('code') code: string,
		@Query('device_id') device_id: string,
		@Param('provider') provider: string
	) {
		console.log(code)
		console.log(device_id)
		if (!code) {
			throw new BadRequestException(
				'Не был предоставлен код авторизации.'
			)
		}

		await this.oauthService.create(provider, code, device_id)

		return res.redirect(
			`dashboard/settings`
		)
	}

	

	@ApiOperation({
				summary: 'OAuth Get Url',
				description:
					'User requested to resend verification code to given earlier identifier (email) for passport recovery.'
			})
    @Get('/oauth/connect/:provider')
	public async connect(@Param('provider') provider: string) {
		const providerInstance = this.oauthService.findProvider(provider)
		return {
			url: providerInstance.getAuthUrl()
		}
	}

}
