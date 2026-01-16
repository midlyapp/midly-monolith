import { applyDecorators, UseGuards } from '@nestjs/common'

import { RefreshTokenGuard } from '../guards'

export function RefreshToken() {
	return applyDecorators(UseGuards(RefreshTokenGuard))
}
