import { registerAs } from '@nestjs/config'

import { validateEnv } from '@/libs/utils'

import type { AllEnvConfigs } from '../interfaces'
import { CookieValidator } from '../validators'

export const cookieEnv = registerAs<AllEnvConfigs['cookies']>('cookie', () => {
	validateEnv(process.env, CookieValidator)

	return {
		cookie_domain: process.env.COOKIES_DOMAIN,
		cookie_secure: Boolean(process.env.COOKIES_SECRET)
	}
})
