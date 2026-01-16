import { registerAs } from '@nestjs/config'

import { validateEnv } from '@/libs/utils'

import type { AllEnvConfigs } from '../interfaces'
import { PostgresValidator } from '../validators'

export const postgresEnv = registerAs<AllEnvConfigs['postgres']>(
	'postgres',
	() => {
		validateEnv(process.env, PostgresValidator)

		return {
			host: process.env.DATABASE_HOST,
			port: parseInt(process.env.DATABASE_PORT),
			user: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			name: process.env.DATABASE_NAME,
			uri: process.env.DATABASE_URI
		}
	}
)
