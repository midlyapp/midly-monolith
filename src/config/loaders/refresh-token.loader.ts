import { ConfigService } from '@nestjs/config'
import { CookieOptions } from 'express'

import type { AllEnvConfigs } from '../interfaces'

export function getRefreshTokenConfig(
	config: ConfigService<AllEnvConfigs>
): CookieOptions {
	return {
		httpOnly: true,
		secure: config.get('cookies.cookie_secure', { infer: true }),
		domain: config.get('cookies.cookie_domain', { infer: true }),
		sameSite: 'lax',
		maxAge: 30 * 24 * 60 * 60 * 1000
	}
}
