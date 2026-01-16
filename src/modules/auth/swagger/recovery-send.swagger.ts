import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger'

import { SendCodeRequest } from '../dto/requests'

export const RecoverySendSwagger = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Send OTP for recovery password',
			description:
				'Sending OTP verification code to the given user identifier (email) for recovery password.'
		}),
		ApiOkResponse({ example: '' }),
		ApiBody({
			type: SendCodeRequest
		})
	)
