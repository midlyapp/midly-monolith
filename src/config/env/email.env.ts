import { registerAs } from '@nestjs/config'

import { validateEnv } from '@/libs/utils'

import type { AllEnvConfigs } from '../interfaces'
import { EmailValidator } from '../validators'

export const emailEnv = registerAs<AllEnvConfigs['email']>('email', () => {
	validateEnv(process.env, EmailValidator)

	return {
		host: process.env.MAIL_HOST,
		port: parseInt(process.env.MAIL_PORT),
		user: process.env.MAIL_USER,
		password: process.env.MAIL_PASSWORD,
		secure: Boolean(process.env.MAIL_SECURE)
	}
})
