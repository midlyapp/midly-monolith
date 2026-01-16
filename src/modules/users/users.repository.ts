import { Injectable } from '@nestjs/common'
import type { Users } from '@prisma/generated/prisma/client'
import type {
	UsersCreateInput,
	UsersUpdateInput
} from '@prisma/generated/prisma/models'

import { PrismaService } from '@/infrastructure/prisma/prisma.service'

@Injectable()
export class UsersRepository {
	constructor(private prisma: PrismaService) {}

	/**
	 * Найти пользователя по email.
	 * @param {string} email - Email пользователя.
	 * @returns {Promise<User | null>} Найденный пользователь или null, если не найден.
	 */

	public async findByEmail(email: string): Promise<Users | null> {
		return await this.prisma.users.findUnique({
			where: {
				email
			}
		})
	}

	/**
	 * Найти пользователя по id.
	 * @param {string} id - Id пользователя.
	 * @returns {Promise<User | null>} Найденный пользователь или null, если не найден.
	 */

	public async findById(id: string): Promise<Users | null> {
		return await this.prisma.users.findFirst({
			where: {
				id
			}
		})
	}

	/**
	 * Создать аккаунт пользователя.
	 * @param email - Email пользователя.
	 * @param name - Имя пользователя
	 * @param password - Пароль пользователя.
	 * @returns {Promise<User>} Найденный пользователь или null, если не найден.
	 */

	async createAccount(data: UsersCreateInput): Promise<Users> {
		return await this.prisma.users.create({
			data
		})
	}

	async updateAccount(id: string, data: UsersUpdateInput): Promise<Users> {
		return await this.prisma.users.update({
			where: {
				id
			},
			data
		})
	}
}
