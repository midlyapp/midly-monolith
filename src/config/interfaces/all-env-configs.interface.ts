import { CookieConfig } from './cookie.interface'
import { JwtConfig } from './jwt.interface'
import { PostgresConfig } from './postgres.interface'
import { RedisConfig } from './redis.interface'

export interface AllEnvConfigs {
	postgres: PostgresConfig
	redis: RedisConfig
	jwt: JwtConfig
	cookies: CookieConfig
}
