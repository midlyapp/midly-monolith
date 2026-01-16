import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'

export const SignOutSwagger = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Sign Out',
			description:
				'Sign out from user account and redirect to sign in page.'
		}),
		ApiOkResponse()
	)
