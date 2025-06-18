import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RpcExceptionHandler } from './common/exceptions/rpc-exception.filter';
import { envs } from './config/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new RpcExceptionHandler());

  const config = new DocumentBuilder()
    .setTitle('Proyecto Sistemas Distribuidos')
    .setDescription('')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.listen(envs.port);

  Logger.log(
    `🚀 API Gateway is running on: ${await app.getUrl()}`,
    'ApiGateway',
  );
}
bootstrap();
