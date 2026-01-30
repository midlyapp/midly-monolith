import {
	BadRequestException,
	UnauthorizedException
} from '@nestjs/common'

import type { TypeBaseOauthOptions } from './types/base-oauth-options.types'
import { TypeUserInfo } from './types/user-info.types'
import { randomBytesAsync } from '@/libs/utils'
import { createHash } from 'node:crypto'
import {nanoId} from 'nanoid'
import { PKCERepository } from '../pkce.repository'



export abstract class BaseOAuthService {
	private BASE_URL: string
	public  type: string
	public verifier_code = '-EXGdwKnF-1wyw8CkSKRm_giDkvmBPOEnOYK3TDiqpY'
	public challenge_code = 'qJy-TQ_64Up-1W9hqb3JU1RjDCYE7VipuXfEq8vtzQU'

	public constructor(
		public readonly options: TypeBaseOauthOptions,
		type: string,
		private readonly pkceRepository: PKCERepository
	) {
		this.type = type
	}

	protected async extractUserInfo(data: any): Promise<TypeUserInfo> {
		return {
			...data,
			provider: this.options.name
		}
	}


	public async  getAuthUrl<T>(parameters: T): Promise <string> {
		const {code_verifier, code_challenge, code_challenge_method} = await this.createPKCE(43)
		const query = new URLSearchParams({
			response_type: 'code',
			client_id: '54426247',
			code_challenge,
			code_challenge_method,
			redirect_uri: this.getRedirectUrl(),
			state: 's7UJozJ59gPnNsDmJ2WJs8DSLvAwAU9n',
			scope: (this.options.scopes ?? []).join(' '),
			// access_type: 'offline',
			// prompt: 'select_account'
			...parameters
		})

		return `${this.options.authorize_url}?${query}`
	}


	public async findUserByCode(code: string, device_id?:string): Promise<TypeUserInfo> {
		const client_id = this.options.client_id
		const client_secret = this.options.client_secret

		const tokenQuery = new URLSearchParams({
			grant_type: 'authorization_code',
			code_verifier: this.verifier_code,
			redirect_uri: this.getRedirectUrl(), // Yandex необязательный
			code,
			client_id: '54426247',
			device_id: device_id ? device_id : null,
			// client_secret,
			state: 's7UJozJ59gPnNsDmJ2WJs8DSLvAwAU9n',
		})

		const tokensRequest = await fetch(this.options.access_url, {
			method: 'POST',
			body: tokenQuery,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		})

		
		if (!tokensRequest.ok) {
			throw new BadRequestException(
				`Не удалось получить пользователя с ${this.options.profile_url}. Проверьте правильность токена доступа.`
			)
		}
		
		const tokens = await tokensRequest.json()
		
		console.log('Токены: ', tokens)

		if (!tokens.access_token) {
			throw new BadRequestException(
				`Нет токенов с ${this.options.access_url}. Убедитесь, что код авторизации действителен.`
			)
		}

		const query = new URLSearchParams({
			access_token: tokens.access_token,
			client_id: '54426247'
		})

		const userRequest = await fetch(this.options.profile_url, {
			method: 'POST',
			body: query,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		})



		if (!userRequest.ok) {
			throw new UnauthorizedException(
				`Не удалось получить пользователя с ${this.options.profile_url}. Проверьте правильность токена доступа.`
			)
		}

		const user = await userRequest.json()
		console.log(user)
		const userData = await this.extractUserInfo(user)

		return {
			...userData,
			access_token: tokens.access_token,
			refresh_token: tokens.refresh_token,
			expires_at: tokens.expires_at || tokens.expires_in,
			provider: this.options.name
		}
	}

	// EDIT
	private getRedirectUrl() {
		return 'http://localhost/auth/oauth/callback/vk'
	}
	// private getRedirectUrl() {
	// 	return `http://localhost:4000/auth/oauth/callback/${this.options.name}`
	// }

	public abstract getOAuthUrl(data)

	public async getTokens<T extends Record<string, string>, U>(data:T): Promise<U>{
		const { state, code_challenge, code_verifier} = await this.createPKCE()
		const query = new URLSearchParams({
					...data
				})
				return ''
	}

	public getUserInfo(data){}




}
