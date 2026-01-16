import { registerAs } from '@nestjs/config'

import { validateEnv } from '@/libs/utils'

import type { AllEnvConfigs } from '../interfaces'
import { RedisValidator } from '../validators'

export const redisEnv = registerAs<AllEnvConfigs['redis']>('redis', () => {
	validateEnv(process.env, RedisValidator)

	return {
		host: process.env.REDIS_HOST,
		port: parseInt(process.env.REDIS_PORT),
		user: process.env.REDIS_USER,
		password: process.env.REDIS_PASSWORD,
		uri: process.env.REDIS_URI
	}
})
