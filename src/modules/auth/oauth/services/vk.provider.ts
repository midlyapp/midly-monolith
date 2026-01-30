import { Injectable } from '@nestjs/common'
import { BaseOAuthService } from './base-oauth.service'
import { TypeUserInfo } from './types/user-info.types'
import { ConfigService } from '@nestjs/config'
import type { TypeVkOauthOptions } from './types/base-oauth-options.types'


@Injectable()
export class VkProvider extends BaseOAuthService<TypeVkOauthOptions> {
	public readonly provider = 'vk'

	public constructor(
		private readonly configService: ConfigService
	) {
		super({
			name: 'vk',
			authorize_url: 'https://id.vk.ru/authorize',
			access_url: 'https://id.vk.ru/oauth2/auth',
			profile_url: 'https://id.vk.ru/oauth2/user_info',
			scopes: ['vkid.personal_info','email','phone'],
			client_id: configService.getOrThrow<string>('VK_CLIENT_ID'),
			client_secret: configService.getOrThrow<string>(
				'VK_CLIENT_SECRET'
			),
			state: ''

		}, 'vk')
	}

	public async extractUserInfo(data: YandexProfile): Promise<TypeUserInfo> {
		return super.extractUserInfo({
			// email: data.emails[0],
			// name: data.display_name,
			// picture: data.default_avatar_id
			// 	? `https://avatars.yandex.net/get-yapic/${data.default_avatar_id}/islands-200`
			// 	: undefined,
			payload: {data}
		})
	}

}


interface YandexProfile {
	login: string
	id: string
	client_id: string
	psuid: string
	emails?: string[]
	default_email?: string
	is_avatar_empty?: boolean
	default_avatar_id?: string
	birthday?: string | null
	first_name?: string
	last_name?: string
	display_name?: string
	real_name?: string
	sex?: 'male' | 'female' | null
	default_phone?: { id: number; number: string }
	access_token: string
	refresh_token?: string
}
