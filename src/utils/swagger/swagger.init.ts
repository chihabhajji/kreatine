import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function swaggerInit(app: INestApplication) {
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
      'docs',
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
