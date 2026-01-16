import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger'

import { ValidateCodeRequest } from '../dto/requests'

export const ValidateOtpSwagger = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Validate OTP for Sign Up',
			description:
				'Validating given OTP verification code and user identifier (email).'
		}),
		ApiOkResponse(),
		ApiBody({
			type: ValidateCodeRequest
		})
	)
