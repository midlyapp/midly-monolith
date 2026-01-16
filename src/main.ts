import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { getCorsConfig } from './config/loaders/cors.loader'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = app.get(ConfigService)
	const logger = new Logger()

	app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')))
	app.enableCors(getCorsConfig(config))

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Middly API')
		.setDescription('API Gateway for Middly microservices')
		.setVersion('1.0.0')
		.addBearerAuth()
		.build()

	const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)

	SwaggerModule.setup('/docs', app, swaggerDocument, {
		yamlDocumentUrl: '/openapi.yaml'
	})

	const port = config.getOrThrow<number>('HTTP_PORT')
	const host = config.getOrThrow<string>('HTTP_HOST')

	await app.listen(port)
	logger.log(`Gateway is running: ${host}`)
	logger.log(`Swagger is running: ${host}/docs`)
}
bootstrap()
