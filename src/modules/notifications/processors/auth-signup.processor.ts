import { Injectable } from '@nestjs/common'
import { render } from '@react-email/components'

import { EmailChannel } from '../channels/email.channel'
import { AuthOtpEmailTemplate } from '../templates/auth-otp.template'
import type { AuthOtpMessage } from '../types'
import { NotificationProcessor } from '../types/notification-processor.interface'

@Injectable()
export class AuthSignUpProcessor extends NotificationProcessor {
	constructor(private readonly emailChannel: EmailChannel) {
		super()
	}
	public readonly type = 'auth.signup'

	supports(type: string): boolean {
		return type === 'auth.signup'
	}

	async process(payload: AuthOtpMessage): Promise<void> {
		const { identifier, code } = payload

		try {
			const html = await render(AuthOtpEmailTemplate(code))

			await this.emailChannel.send({
				to: identifier,
				subject: 'Код верификации',
				html
			})
		} catch (e) {
			console.log('PROCESSOR', e)
		}
	}
}
