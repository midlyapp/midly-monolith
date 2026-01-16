import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsInt, IsNotEmpty, Length } from 'class-validator'

export class ValidateCodeRequest {
	@ApiProperty({ example: 'razrab@bk.ru' })
	@IsEmail()
	@IsNotEmpty()
	public identifier: string

	@ApiProperty({ example: '123456' })
	@IsInt()
	@Length(6, 6)
	public code: number
}
