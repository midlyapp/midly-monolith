import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import type { Request } from 'express'

import { AllEnvConfigs } from '@/config'

@Injectable()
export class RefreshTokenGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService<AllEnvConfigs>
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const token = this.extractTokenFromHeader(request)

		if (!token) {
			throw new UnauthorizedException('Guard')
		}

		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: this.configService.get('jwt.refresh_token_secret', {
					infer: true
				})
			})

			request.user = {
				id: payload.userId,
				refreshToken: token
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
