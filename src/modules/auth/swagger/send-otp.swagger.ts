import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger'

import { SendCodeRequest } from '../dto/requests'

export const SendOtpSwagger = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Send OTP for Sign Up',
			description:
				'Sending OTP verification code to the given user identifier (email).'
		}),
		ApiOkResponse({ example: '' }),
		ApiBody({
			type: SendCodeRequest
		})
	)
