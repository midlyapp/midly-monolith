import { Injectable } from '@nestjs/common'
import { render } from '@react-email/components'

import { EmailChannel } from '../channels/email.channel'
import { AuthOtpEmailTemplate } from '../templates/auth-otp.template'
import type { AuthOtpMessage } from '../types'
import { NotificationProcessor } from '../types/notification-processor.interface'

@Injectable()
export class AuthRecoveryProcessor extends NotificationProcessor {
	constructor(private readonly emailChannel: EmailChannel) {
		super()
	}
	public readonly type = 'auth.recovery'

	supports(type: string): boolean {
		return type === 'auth.recovery'
	}

	async process(payload: AuthOtpMessage): Promise<void> {
		const { identifier: email, code } = payload
		const html = await render(AuthOtpEmailTemplate(code))

		await this.emailChannel.send({
			to: email,
			subject: 'Код верификации для смены пароля',
			html
		})
	}
}
