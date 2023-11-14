import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import swaggerInit from './utils/swagger/swagger.init';
import { ConfigService } from '@nestjs/config';
import { OrySecrets } from './modules/auth/ory/ory.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // TODO this was my first fight with andrea
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  const port = process.env.PORT || 3000;
  if (process.env.NODE_ENV !== 'production') {
    const configService = app.get<ConfigService>(ConfigService);
    const orySecrets = configService.getOrThrow('ory') as OrySecrets;
    swaggerInit(app, orySecrets);
  }
  await app.listen(port);
  const appUrl = await app.getUrl();
  Logger.log(
    `🚀 Application is running on: ${appUrl}/${globalPrefix} , docs on ${appUrl}/docs`,
  );
}

bootstrap();
