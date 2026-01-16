import { applyDecorators } from '@nestjs/common'
import { ApiHeaders, ApiOkResponse, ApiOperation } from '@nestjs/swagger'

export const RefreshJwtSwagger = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Refresh JWT tokens',
			description:
				'Validate given user refresh token and generate new one.'
		}),
		ApiOkResponse(),
		ApiHeaders([{ name: 'Authorization', required: true }])
	)
