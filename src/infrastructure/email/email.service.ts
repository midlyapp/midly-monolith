import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'

@Injectable()
export class EmailService implements OnModuleInit {
	private readonly logger = new Logger(EmailService.name)
	constructor(private readonly mailerService: MailerService) {}

	async onModuleInit() {
		try {
			const transporter = (this.mailerService as any).transporter
			await this.mailerService['transporter'].verify()

			this.logger.log(
				'SMTP Connection has been established successfully.'
			)
		} catch (error) {
			this.logger.error('SMTP Connection Error:', error)
		}
	}

	async send(data: ISendMailOptions) {
		this.mailerService.sendMail(data)
	}
}
