import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { getProvidersConfig } from '@/config/loaders/oauth.loader'

import { OtpService } from '../otp/otp.service'
import { UsersRepository } from '../users/users.repository'
import { UsersService } from '../users/users.service'

import {
	AuthRecoveryController,
	AuthSignInController,
	AuthSignUpController,
	AuthTokensController
} from './controllers'
import { OAuthModule } from './oauth/oauth.module'
import {
	AuthCodesService,
	AuthCoreService,
	AuthTokensService
} from './services'

@Module({
	imports: [
		OAuthModule.registerAsync({
			imports: [ConfigModule],
			useFactory: getProvidersConfig,
			inject: [ConfigService]
		}),
		JwtModule
	],
	controllers: [
		AuthSignInController,
		AuthSignUpController,
		AuthTokensController,
		AuthRecoveryController
	],
	providers: [
		AuthCoreService,
		AuthCodesService,
		AuthTokensService,
		UsersService,
		OtpService,
		UsersRepository
	]
})
export class AuthModule {}
