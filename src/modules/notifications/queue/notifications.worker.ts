import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq'
import { Inject } from '@nestjs/common'
import { Job } from 'bullmq'

import { NotificationMessage } from '../types'
import { NotificationProcessor } from '../types/notification-processor.interface'

@Processor('notifications')
export class NotificationsWorker extends WorkerHost {
	constructor(
		@Inject('NOTIFICATION_PROCESSOR')
		private readonly processors: NotificationProcessor[]
	) {
		super()
	}

	async process(job: Job<NotificationMessage>): Promise<any> {
		try {

			const processor = this.processors.find((p) => p.supports(job.data.type))

			if (!processor) {
				throw new Error(`No processor for ${job.data.type}`)
			}

			await processor.process(job.data.payload)
		} catch (e) {
			console.log('WORKER ERROR', e)
		}
	}

	@OnWorkerEvent('completed')
	onCompleted() {
		console.log('EMAIL IS SENT!')
	}

	@OnWorkerEvent('failed')
	onFailed() {
		console.log('EMAIL FAILED!')
	}
}
