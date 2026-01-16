import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger'

import { RecoverySetRequest } from '../dto/requests'

export const RecoverySetSwagger = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Set new password',
			description: 'Set new user password and finish recovery.'
		}),
		ApiOkResponse(),
		ApiParam({ name: 'recovery_token' }),
		ApiBody({
			type: RecoverySetRequest
		})
	)
