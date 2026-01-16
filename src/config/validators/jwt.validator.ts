import { IsInt, IsNotEmpty, IsString, IsUrl, Max, Min } from 'class-validator'

export class JwtValidator {
	@IsString()
	@IsNotEmpty()
	public JWT_ACCESS_TOKEN_SECRET: string

	@IsString()
	@IsNotEmpty()
	public JWT_REFRESH_TOKEN_SECRET: string

	@IsString()
	@IsNotEmpty()
	public JWT_ACCESS_TOKEN_EXPIRATION: string

	@IsString()
	@IsNotEmpty()
	public JWT_REFRESH_TOKEN_EXPIRATION: string
}
