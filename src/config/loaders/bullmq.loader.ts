import type { BullRootModuleOptions } from '@nestjs/bullmq'
import { ConfigService } from '@nestjs/config'

import { AllEnvConfigs } from '../interfaces'

export function getBullMqConfig(
	config: ConfigService<AllEnvConfigs>
): BullRootModuleOptions {
	return {
		connection: {
			host: config.get('redis.host', { infer: true }),
			port: config.get('redis.port', { infer: true }),
			username: config.get('redis.user', { infer: true }),
			password: config.get('redis.password', { infer: true })
		}
	}
}
