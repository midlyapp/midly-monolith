export interface NotificationMessage {
	type: string
	payload: unknown
}

export interface AuthOtpMessage {
	identifier: string
	code: string
}
