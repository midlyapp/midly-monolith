import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import type { Request } from 'express'

import { AllEnvConfigs } from '@/config'
import type { JwtPayload } from '@/modules/auth/types/jwtPayload.type'

import { DKEY_IS_PUBLIC } from '../decorators'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService<AllEnvConfigs>
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(
			DKEY_IS_PUBLIC,
			[context.getHandler(), context.getClass()]
		)

		if (isPublic) {
			return true
		}

		const request = context.switchToHttp().getRequest()
		const token = this.extractTokenFromHeader(request)
		if (!token) {
			throw new UnauthorizedException()
		}
		try {
			const payload: JwtPayload = await this.jwtService.verifyAsync(
				token,
				{
					secret: this.configService.get('jwt.access_token_secret', {
						infer: true
					})
				}
			)
			request.user = {
				id: payload.sub
			}
		} catch {
			throw new UnauthorizedException()
		}
		return true
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? []
		return type === 'Bearer' ? token : undefined
	}
}
