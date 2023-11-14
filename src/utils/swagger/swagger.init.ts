import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { OrySecrets } from '../../modules/auth/ory/ory.config';

export default function swaggerInit(
  app: INestApplication,
  orySecrets: OrySecrets,
) {
  console.log(orySecrets);
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('kreativious-backend')
      .addOAuth2({
        name: 'oauth2',
        type: 'oauth2',
        scheme: 'securityScheme',
        description: 'OAuth2',
        flows: {
          authorizationCode: {
            authorizationUrl: `${orySecrets.oryBasePath}/oauth2/auth`,
            tokenUrl: `${orySecrets.oryBasePath}/oauth2/token`,
            refreshUrl: `${orySecrets.oryBasePath}/oauth2/token`,
            scopes: orySecrets.oryAppClientScopes.reduce(
              (acc, cur) => {
                acc[cur] = cur;
                return acc;
              },
              {} as Record<string, string>,
            ),
          },
        },
      })
      .addSecurityRequirements('oauth2')
      .build();
    SwaggerModule.setup(
      'docs',
      app,
      SwaggerModule.createDocument(app, config, {
        operationIdFactory: (controllerKey, methodKey) => methodKey,
        deepScanRoutes: true,
      }),
      {
        yamlDocumentUrl: '/yaml',
        jsonDocumentUrl: '/json',
        swaggerOptions: {
          persistAuthorization: true,
          oauth2RedirectUrl: 'http://localhost:5173/docs/oauth2-redirect.html',
          initOAuth: {
            appName: orySecrets.oryAppName,
            clientId: orySecrets.oryAppClientId,
            clientSecret: orySecrets.oryAppClientSecret,
            scopes: orySecrets.oryAppClientScopes,
          },
        },
      },
    );
  }
}
