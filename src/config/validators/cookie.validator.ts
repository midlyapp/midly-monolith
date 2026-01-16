import { IsInt, IsNotEmpty, IsString, IsUrl, Max, Min } from 'class-validator'

export class CookieValidator {
	@IsString()
	@IsNotEmpty()
	public COOKIES_DOMAIN: string

	@IsString()
	@IsNotEmpty()
	public COOKIES_SECRET: string
}
