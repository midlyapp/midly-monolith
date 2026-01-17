import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bullmq'

import type { AuthOtpMessage } from './types'

@Injectable()
export class NotificationsFacade {
	constructor(@InjectQueue('notifications') private readonly queue: Queue) {}

	public async authSignUpCode(payload: AuthOtpMessage): Promise<void> {
		await this.queue.add(
			'auth.signup',
			{
				type: 'auth.signup',
				payload
			},
			{
				attempts: 5,
				backoff: {
					type: 'exponential',
					delay: 1000
				},
				removeOnComplete: true
			}
		)
	}

	public async authRecoveryCode(payload: AuthOtpMessage): Promise<void> {
		await this.queue.add(
			'auth.recovery',
			{
				type: 'auth.recovery',
				payload
			},
			{
				attempts: 5,
				backoff: {
					type: 'exponential',
					delay: 1000
				},
				removeOnComplete: true
			}
		)
	}
}
