import { type INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  initSwagger(app);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

function initSwagger(app: INestApplication) {
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('kreativious-backend')
      .addServer('http://localhost:3000')
      .addBearerAuth({
        name: 'Authorization',
        description: `Please enter token in following format: Bearer <JWT>`,
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'header',
      })
      .addSecurityRequirements('Authorization')
      .build();
    SwaggerModule.setup(
      'swagger',
      app,
      SwaggerModule.createDocument(app, config, {
        operationIdFactory: (controllerKey, methodKey) => methodKey,
        deepScanRoutes: true,
      }),
      {
        // url: '/swagger',
        yamlDocumentUrl: '/yaml',
        jsonDocumentUrl: '/json',
        swaggerOptions: {
          persistAuthorization: true,
        },
      },
    );
  }
}

bootstrap();
