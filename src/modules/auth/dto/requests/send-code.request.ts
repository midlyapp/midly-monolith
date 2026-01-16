import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class SendCodeRequest {
	@ApiProperty({ example: 'razrab@bk.ru' })
	@IsEmail()
	@IsNotEmpty()
	public identifier: string
}
