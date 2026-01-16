import { IsInt, IsNotEmpty, IsString, IsUrl, Max, Min } from 'class-validator'

export class RedisValidator {
	@IsString()
	@IsNotEmpty()
	public REDIS_HOST: string

	@IsInt()
	@Min(1)
	@Max(65535)
	public REDIS_PORT: number

	@IsString()
	@IsNotEmpty()
	public REDIS_USER: string

	@IsString()
	@IsNotEmpty()
	public REDIS_PASSWORD: string

	@IsUrl({ protocols: ['redis'] })
	public REDIS_URI: string
}
