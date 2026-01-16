import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { cookieEnv, jwtEnv, postgresEnv, redisEnv } from './config/env'
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
			load: [redisEnv, postgresEnv, jwtEnv, cookieEnv]
		}),
		RedisModule,
		PrismaModule,
		AuthModule,
		UsersModule,
		NotificationsModule,
		PaymentsModule,
		OtpModule
	]
})
export class AppModule {}
