import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger'

import { ValidateCodeRequest } from '../dto/requests'

export const RecoveryValidateSwagger = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Validate OTP for recovery password',
			description:
				'Validating given OTP verification code, user identifier (email) and token for recovery user password.'
		}),
		ApiOkResponse(),
		ApiBody({
			type: ValidateCodeRequest
		})
	)
