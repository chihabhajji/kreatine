import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function swaggerInit(app: INestApplication) {
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
            authorizationUrl:
              'https://infallible-brattain-buzagnyuc0.projects.oryapis.com/oauth2/auth',
            tokenUrl:
              'https://infallible-brattain-buzagnyuc0.projects.oryapis.com/oauth2/token',
            refreshUrl:
              'https://infallible-brattain-buzagnyuc0.projects.oryapis.com/oauth2/token',
            scopes: {
              openid: 'openid',
              offline_access: 'offline_access',
              offline: 'offline',
              email: 'email',
              profile: 'profile',
            },
          },
        },
      })
      .addSecurityRequirements('oauth2', [])
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
          initOAuth: {
            appName: 'kreativious-backend',
            realm: 'kreativious-backend',
            clientId: '076433a5-40e1-48b0-ba2a-12fd68124925',
            clientSecret: 'sG1KrBNHa-h0Sq-K4QO2jj_qR',
            additionalQueryStringParams: {
              redirect_uri: 'http://localhost:3000/docs/callback',
            },
            scopes: ['openid', 'offline_access', 'offline', 'email', 'profile'],
            useBasicAuthenticationWithAccessCodeGrant: true,
          },
        },
      },
    );
  }
}
