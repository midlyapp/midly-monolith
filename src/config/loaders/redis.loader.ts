import type { ConfigService } from '@nestjs/config'
import type { RedisOptions } from 'ioredis'

import { AllEnvConfigs } from '../interfaces'

export function getRedisConfig(
	config: ConfigService<AllEnvConfigs>
): RedisOptions {
	return {
		port: config.get('redis.port', { infer: true }),
		host: config.get('redis.host', { infer: true }),
		username: config.get('redis.user', { infer: true }),
		password: config.get('redis.password', { infer: true }),
		maxRetriesPerRequest: 5,
		enableOfflineQueue: true,
		connectTimeout: 30000
	}
}
