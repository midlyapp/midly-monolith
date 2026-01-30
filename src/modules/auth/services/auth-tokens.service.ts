import {
	ForbiddenException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { AllEnvConfigs, getJwtConfig } from '@/config'
import { UsersRepository } from '@/modules/users/users.repository'

import { JwtPayload } from '../types/jwtPayload.type'
import { JwtTokens } from '../types/jwtTokens.type'

@Injectable()
export class AuthTokensService {
	constructor(
		private readonly userRepository: UsersRepository,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService<AllEnvConfigs>
	) {}

	public async refreshTokens(
		userId: string,
		refreshToken: string
	): Promise<JwtTokens> {
		const existingUser = await this.userRepository.findById(userId)

		if (!existingUser || !refreshToken) {
			throw new ForbiddenException('Пользователь не найден.')
		}

		try {
			await this.jwtService.verifyAsync(refreshToken, {
				secret: this.configService.get('jwt.refresh_token_secret', {
					infer: true
				})
			})
		} catch {
			throw new UnauthorizedException()
		}

		return await this.generateTokens({
			sub: userId,
			username: existingUser.name
		})
	}

	public async generateTokens(payload: JwtPayload): Promise<JwtTokens> {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(
				payload,
				getJwtConfig('access', this.configService)
			),
			this.jwtService.signAsync(
				payload,
				getJwtConfig('refresh', this.configService)
			)
		])

		return {
			accessToken,
			refreshToken
		}
	}

	public async inTokenWhiteListed(jti: string){

	}

	public async revokeToken(id: string, refreshToken: string): Promise<void> {
		const isUserDefined = await this.userRepository.findById(id)
	}

	
}
