import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger'

import { SendCodeRequest } from '../dto/requests'

export const ResendOtpSwagger = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Resend OTP for Sign Up',
			description:
				'User requested to resend verification code to given earlier identifier (email).'
		}),
		ApiOkResponse(),
		ApiBody({
			type: SendCodeRequest
		})
	)
