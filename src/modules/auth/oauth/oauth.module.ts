import { DynamicModule, Module } from '@nestjs/common'

import {
	OauthOptionsSymbol,
	type TypeAsyncOptions,
	type TypeOptions
} from './oauth.constants'
import { OAuthService } from './oauth.service'

@Module({})
export class OAuthModule {
	public static register(options: TypeOptions): DynamicModule {
		return {
			module: OAuthModule,
			providers: [
				{
					useValue: options.services,
					provide: OauthOptionsSymbol
				},
				OAuthService
			],
			exports: [OAuthService]
		}
	}

	public static registerAsync(options: TypeAsyncOptions): DynamicModule {
		return {
			module: OAuthModule,
			imports: options.imports,
			providers: [
				{
					useFactory: options.useFactory,
					provide: OauthOptionsSymbol,
					inject: options.inject
				},
				OAuthService
			],
			exports: [OAuthService]
		}
	}
}
