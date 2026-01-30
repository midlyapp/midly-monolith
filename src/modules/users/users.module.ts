import { Module } from '@nestjs/common'

import { PrismaService } from '@/infrastructure/prisma/prisma.service'

import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { UsersService } from './users.service'
import { OAuthRepository } from './oauth.repository'

@Module({
	controllers: [UsersController],
	providers: [UsersService, UsersRepository, PrismaService],
	exports: [UsersService, UsersRepository, OAuthRepository]
})
export class UsersModule {}
