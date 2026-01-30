import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import type { Account } from "@prisma/generated/prisma/client";
import type { AccountCreateInput } from "@prisma/generated/prisma/models";

@Injectable()
export class OAuthRepository{
    constructor(
        private readonly prisma: PrismaService
    ){}

    public async createAccount(data: AccountCreateInput): Promise<Account>{
        return await this.prisma.account.create({
            data
        })
    }

     public async findAccount(data: AccountCreateInput): Promise<Account>{
        return await this.prisma.account.create({
            data
        })
    }
}
