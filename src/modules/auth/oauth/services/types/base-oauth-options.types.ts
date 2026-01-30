/**
 * Опции базового провайдера OAuth.
 *
 * Этот тип описывает необходимые параметры для аутентификации через OAuth.
 */
export interface TypeBaseOauthOptions {
	name: string
	authorize_url: string
	access_url: string
	profile_url: string
	scopes: string[]
	client_id: string
	client_secret: string
}

export interface TypeVkOauthOptions extends TypeBaseOauthOptions {
	state: string
}
