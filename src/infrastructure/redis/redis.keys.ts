export const RedisKeys = {
	otpAuthSignUp: (identifier: string) => `otp:auth_sign-in:${identifier}`,
	otpAuthRecovery: (identifier: string) => `otp:auth_recovery:${identifier}`,
	authSignUpToken: (identifier: string) => `auth:signup_token:${identifier}`,
	authRecoveryToken: (identifier: string) =>
		`auth:recovery_token:${identifier}`
} as const
