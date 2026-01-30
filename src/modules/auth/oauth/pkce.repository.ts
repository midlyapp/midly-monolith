import { RedisKeys } from "@/infrastructure/redis/redis.keys";
import { RedisService } from "@/infrastructure/redis/redis.service";
import { Injectable } from "@nestjs/common";
import {nanoid} from 'nanoid'
import { randomBytesAsync } from '@/libs/utils'
import { createHash } from 'node:crypto'

@Injectable()
export class PKCERepository {
    constructor(
        private readonly redis: RedisService
    ){}

    public async create(provider: string){

        const state = nanoid()
		const codeVerifier = await randomBytesAsync(43, 'base64url')
		const codeChallenge = createHash('sha256').update(codeVerifier).digest('base64url');

        await this.redis.set(RedisKeys.oauthState(state), JSON.stringify({
            code_verifier: codeVerifier,
            provider,
        }),'EX', 600)

        return { state, codeChallenge };
    }

    async consume(state: string) {
        const key = RedisKeys.oauthState(state)
        const raw = await this.redis.get(key);
        
        if (!raw) {
            throw new Error('Invalid or expired state');
        }

        await this.redis.del(key);
        return JSON.parse(raw);
    }
}