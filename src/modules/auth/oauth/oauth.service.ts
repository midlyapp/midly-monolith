import { Inject, Injectable, OnModuleInit } from '@nestjs/common'

import { OauthOptionsSymbol, type TypeOptions } from './oauth.constants'
import { BaseOAuthService } from './services/base-oauth.service'

@Injectable()
export class OAuthService implements OnModuleInit {
	public constructor(
		@Inject(OauthOptionsSymbol) private readonly options: TypeOptions
	) {}

	public onModuleInit() {
		for (const provider of this.options.services) {
			provider.baseUrl = this.options.baseUrl
		}
	}

	public findByService(service: string): BaseOAuthService | null {
		return this.options.services.find((s) => s.name === service) ?? null
	}
}
