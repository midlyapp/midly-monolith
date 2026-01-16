import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger'

import { SignInRequest } from '../dto/requests'

export const SignInSwagger = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Sign In',
			description:
				'Validate given account credentials and generate tokens for sign in.'
		}),
		ApiOkResponse(),
		ApiBody({
			type: SignInRequest
		})
	)
