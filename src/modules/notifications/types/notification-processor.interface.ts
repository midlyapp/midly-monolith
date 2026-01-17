export abstract class NotificationProcessor {
	abstract supports(type: string): boolean
	abstract process(message: any): Promise<void>
}
