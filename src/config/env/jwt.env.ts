import { registerAs } from '@nestjs/config'

import { validateEnv } from '@/libs/utils'

import type { AllEnvConfigs } from '../interfaces'
import { JwtValidator } from '../validators'

export const jwtEnv = registerAs<AllEnvConfigs['jwt']>('jwt', () => {
	validateEnv(process.env, JwtValidator)

	return {
		access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
		refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
		access_token_expiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
		refresh_token_expiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION
	}
})
