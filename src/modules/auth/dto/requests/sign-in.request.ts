import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator'

export class SignInRequest {
	@ApiProperty({ example: 'razrab@bk.ru' })
	@IsEmail()
	@IsNotEmpty()
	public identifier: string

	@ApiProperty({ example: 'sa3fBLqu231sdf!aZ' })
	@IsString()
	@IsNotEmpty()
	public password: string
}
