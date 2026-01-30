import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'


import { NotificationsModule } from '../notifications/notifications.module'
import { OtpService } from '../otp/otp.service'
import { UsersRepository } from '../users/users.repository'
import { UsersService } from '../users/users.service'

import {
	AuthRecoveryController,
	AuthSignInController,
	AuthSignUpController,
	AuthTokensController
} from './controllers'
import {
	AuthCodesService,
	AuthCoreService,
	AuthTokensService
} from './services'
import { BaseOAuthService } from './oauth/services/base-oauth.service'
import { YandexProvider } from './oauth/services/yandex.provider'
import { OAuthService } from './services/auth-oauth.service'
import { AuthOAuthController } from './controllers/auth-oauth.controller'
import { VkProvider } from './oauth/services/vk.provider'


@Module({
	imports: [

		JwtModule,
		NotificationsModule
	],
	controllers: [
		AuthSignInController,
		AuthSignUpController,
		AuthTokensController,
		AuthRecoveryController,
		AuthOAuthController
	],
	providers: [
		AuthCoreService,
		AuthCodesService,
		AuthTokensService,
		UsersService,
		OtpService,
		UsersRepository,
		YandexProvider,
		VkProvider,
		OAuthService,
		{
			provide: 'OAUTH_PROVIDER',
			useFactory: (...providers: BaseOAuthService[]) => providers,
			inject: [YandexProvider, VkProvider],
		},
	]
})
export class AuthModule {}
