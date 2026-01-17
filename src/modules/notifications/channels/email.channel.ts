import { ISendMailOptions } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

import { EmailService } from '@/infrastructure/email/email.service'

@Injectable()
export class EmailChannel {
	constructor(private readonly emailService: EmailService) {}

	async send(data: ISendMailOptions) {
		try {
			await this.emailService.send(data)
		} catch (error) {
			console.log(error)
		}
	}
}
