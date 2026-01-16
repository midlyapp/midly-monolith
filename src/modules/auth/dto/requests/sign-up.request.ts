import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator'

export class SignUpRequest {
	@ApiProperty({ example: 'razrab@bk.ru' })
	@IsEmail()
	@IsNotEmpty()
	public identifier: string

	@ApiProperty({ example: 'Alexander' })
	@IsString()
	@IsNotEmpty()
	public name: string

	@ApiProperty({ example: 'sa3fBLqu231sdf!aZ' })
	@IsString()
	@IsNotEmpty()
	public password: string

	@ApiProperty({ example: 'sa3fBLqu231sdf!aZ' })
	@ValidateIf((o) => o.password !== o.repeatPassword)
	@IsString()
	@IsNotEmpty()
	public passwordConfirm: string
}
