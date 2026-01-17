import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { getBullMqConfig } from './config'
import {
	cookieEnv,
	emailEnv,
	jwtEnv,
	postgresEnv,
	redisEnv
} from './config/env'
import { EmailModule } from './infrastructure/email/email.module'
import { PrismaModule } from './infrastructure/prisma/prisma.module'
import { RedisModule } from './infrastructure/redis/redis.module'
import { AuthModule } from './modules/auth/auth.module'
import { NotificationsModule } from './modules/notifications/notifications.module'
import { OtpModule } from './modules/otp/otp.module'
import { PaymentsModule } from './modules/payments/payments.module'
import { UsersModule } from './modules/users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [redisEnv, postgresEnv, jwtEnv, cookieEnv, emailEnv]
		}),
		RedisModule,
		PrismaModule,
		BullModule.forRootAsync({
			useFactory: getBullMqConfig,
			inject: [ConfigService]
		}),
		AuthModule,
		UsersModule,
		NotificationsModule,
		PaymentsModule,
		OtpModule,
		EmailModule
	]
})
export class AppModule {}
