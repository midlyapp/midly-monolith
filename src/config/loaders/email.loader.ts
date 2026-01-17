import type { MailerOptions } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

import type { AllEnvConfigs } from '../interfaces'

export const getMailerConfig = async (
	configService: ConfigService<AllEnvConfigs>
): Promise<MailerOptions> => ({
	transport: {
		host: configService.get('email.host', { infer: true }),
		port: configService.get('email.port', { infer: true }),
		secure: configService.get('email.secure', { infer: true }),
		auth: {
			user: configService.get('email.user', { infer: true }),
			pass: configService.get('email.password', { infer: true })
		}
	},
	defaults: {
		from: `"Midly App" ${configService.get('email.user', { infer: true })}`
	}
})
