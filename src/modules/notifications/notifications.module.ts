import { BullModule } from '@nestjs/bullmq'
import { Global, Module } from '@nestjs/common'

import { EmailModule } from '@/infrastructure/email/email.module'
import { EmailService } from '@/infrastructure/email/email.service'

import { EmailChannel } from './channels/email.channel'
import { NotificationsFacade } from './notifications.facade'
import { AuthRecoveryProcessor } from './processors/auth-recovery.processor'
import { AuthSignUpProcessor } from './processors/auth-signup.processor'
import { NotificationsWorker } from './queue/notifications.worker'
import { NotificationProcessor } from './types/notification-processor.interface'

@Global()
@Module({
	imports: [
		EmailModule,
		BullModule.registerQueue({
			name: 'notifications'
		})
	],
	providers: [
		AuthSignUpProcessor,
		AuthRecoveryProcessor,
		{
			provide: 'NOTIFICATION_PROCESSOR',
      		useFactory: (...processors: NotificationProcessor[]) => processors,
      		inject: [AuthSignUpProcessor, AuthRecoveryProcessor],
		},
		EmailService,
		NotificationsFacade,
		NotificationsWorker,
		EmailChannel
	],
	exports: [NotificationsFacade]
})
export class NotificationsModule {}
