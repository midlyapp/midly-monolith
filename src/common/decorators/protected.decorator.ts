import { applyDecorators, UseGuards } from '@nestjs/common'

import { AuthGuard } from '../guards'

export function Protected() {
	return applyDecorators(UseGuards(AuthGuard))
}
