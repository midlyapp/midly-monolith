import { ConfigService } from '@nestjs/config'
import { JwtSignOptions } from '@nestjs/jwt'

import type { AllEnvConfigs } from '../interfaces'

export function getJwtConfig(
	type: 'access' | 'refresh',
	config: ConfigService<AllEnvConfigs>
): JwtSignOptions {
	const secret = config.get(`jwt.${type}_token_secret`, { infer: true })
	const expiresIn = config.get(`jwt.${type}_token_expiration`, {
		infer: true
	}) as any
	return {
		secret,
		expiresIn: expiresIn
	}
}
