import {
	Injectable,
	Logger,
	type OnModuleDestroy,
	type OnModuleInit
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/generated/prisma/client'

import { AllEnvConfigs } from '@/config'

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	private readonly logger = new Logger(PrismaService.name)
	constructor(private readonly configService: ConfigService<AllEnvConfigs>) {
		const adapter = new PrismaPg({
			connectionString: configService.get('postgres.uri', { infer: true })
		})
		super({ adapter })
	}
	public async onModuleInit() {
		const startTime = Date.now()
		this.logger.log('Connecting to database')

		try {
			await this.$connect()
			const ms = Date.now() - startTime
			this.logger.log(`Database connection established (time=${ms} ms).`)
		} catch (error) {
			this.logger.error(`Failed to connect to database: ${error} `)
			throw error
		}
	}

	public async onModuleDestroy() {
		this.logger.log('Disconnecting to database')

		try {
			await this.$disconnect()
			this.logger.log('Database connection closed.')
		} catch (error) {
			this.logger.error(`Failed to disconnect from database: ${error} `)
			throw error
		}
	}
}
