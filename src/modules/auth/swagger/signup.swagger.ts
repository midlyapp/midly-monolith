import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger'

import { SignUpRequest } from '../dto/requests'

export const SignUpSwagger = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Sign Up',
			description:
				'Receiving default user profile information and finishing registration.'
		}),
		ApiOkResponse(),
		ApiParam({ name: 'registration_token' }),
		ApiBody({
			type: SignUpRequest
		})
	)
