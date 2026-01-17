import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator'

export class EmailValidator {
	@IsString()
	@IsNotEmpty()
	public MAIL_HOST: string

	@IsInt()
	@IsNotEmpty()
	public MAIL_PORT: number

	@IsString()
	@IsNotEmpty()
	public MAIL_USER: string

	@IsString()
	@IsNotEmpty()
	public MAIL_PASSWORD: string

	@IsBoolean()
	@IsNotEmpty()
	public MAIL_SECURE: boolean
}
