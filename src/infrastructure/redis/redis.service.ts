import {
	Injectable,
	Logger,
	type OnModuleDestroy,
	type OnModuleInit
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'

import type { AllEnvConfigs } from '@/config'
import { getRedisConfig } from '@/config/loaders'

@Injectable()
export class RedisService
	extends Redis
	implements OnModuleInit, OnModuleDestroy
{
	private readonly logger = new Logger(RedisService.name)
	constructor(private readonly configService: ConfigService<AllEnvConfigs>) {
		super(getRedisConfig(configService))
	}

	public async onModuleInit() {
		const startTime = Date.now()
		this.logger.log('Connecting to Redis')

		this.on('connect', () => {
			this.logger.log('Redis is connecting...')
		})
		this.on('ready', () => {
			const ms = Date.now() - startTime
			this.logger.log(`Redis connection established (time=${ms} ms).`)
		})
		this.on('error', (error) => {
			this.logger.error('Failed to connect to Redis', {
				error: error.message ?? error
			})
		})
		this.on('close', () => {
			this.logger.log('Redis connection closed.')
		})
		this.on('reconnecting', () => {
			this.logger.log('Redis reconnecting...')
		})
	}

	public async onModuleDestroy() {
		this.logger.log('Closing Redis connection...')

		try {
			await this.quit()
			this.logger.log('Redis connection closed.')
		} catch (error) {
			this.logger.error('Failed to close Redis connection', {
				error: error.message ?? error
			})
			throw error
		}
	}
}
