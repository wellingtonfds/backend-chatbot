import { BadRequestException, ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

import { PrismaClientExceptionFilter } from './exceptions/prisma-client-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // Interceptores
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
      excludeExtraneousValues: true,
    }),
  )
  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: errors => {
        const messages: { [key: string]: string } = {}
        const result = errors
          .map(
            error =>
              messages[error.property] ??
              error.property + ':' + error.constraints[Object.keys(error.constraints)[0]],
          )
          .join(',')
        return new BadRequestException({
          error_code: 'Validation failed',
          error_description: result,
        })
      },
    }),
  )
  // filters
  const httpAdapter = app.getHttpAdapter()
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Backend-ChatBot')
    .setDescription('The Backend API for the ChatBot')
    .setVersion('1.0')
    .addTag('ChatBot')
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
