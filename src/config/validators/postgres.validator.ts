import { IsInt, IsNotEmpty, IsString, IsUrl, Max, Min } from 'class-validator'

export class PostgresValidator {
	@IsString()
	@IsNotEmpty()
	public DATABASE_HOST: string

	@IsInt()
	@Min(1)
	@Max(65535)
	public DATABASE_PORT: number

	@IsString()
	@IsNotEmpty()
	public DATABASE_USER: string

	@IsString()
	@IsNotEmpty()
	public DATABASE_PASSWORD: string

	@IsString()
	@IsNotEmpty()
	public DATABASE_NAME: string

	@IsUrl({ protocols: ['postgresql'] })
	public DATABASE_URI: string
}
