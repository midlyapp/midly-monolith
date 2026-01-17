import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { getMailerConfig } from '@/config/loaders/email.loader'

import { EmailService } from './email.service'

@Module({
	imports: [
		MailerModule.forRootAsync({
			useFactory: getMailerConfig,
			inject: [ConfigService]
		})
	],
	providers: [EmailService],
	exports: [EmailService]
})
export class EmailModule {}
