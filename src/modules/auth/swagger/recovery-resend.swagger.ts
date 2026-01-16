import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger'

import { SendCodeRequest } from '../dto/requests'

export const RecoveryResendSwagger = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Resend OTP for password recovery',
			description:
				'User requested to resend verification code to given earlier identifier (email) for passport recovery.'
		}),
		ApiOkResponse(),
		ApiBody({
			type: SendCodeRequest
		})
	)
