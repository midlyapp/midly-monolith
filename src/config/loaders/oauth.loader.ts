import { ConfigService } from '@nestjs/config'

import { TypeOptions } from '@/modules/auth/oauth/oauth.constants'
import { YandexProvider } from '@/modules/auth/oauth/services/yandex.provider'


// export const getProvidersConfig = async (
// 	configService: ConfigService
// ): Promise<TypeOptions> => ({
// 	// baseUrl: configService.getOrThrow<string>('APPLICATION_URL'),
// 	// services: [
// 	// 	new YandexProvider({
// 	// 		client_id: configService.getOrThrow<string>('YANDEX_CLIENT_ID'),
// 	// 		client_secret: configService.getOrThrow<string>(
// 	// 			'YANDEX_CLIENT_SECRET'
// 	// 		),
// 	// 		scopes: ['login:email', 'login:avatar', 'login:info']
// 	// 	})
// 	// ]
// })
