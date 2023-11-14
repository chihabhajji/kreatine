import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { OrySecrets } from '../../modules/auth/ory/ory.config';

export default function swaggerInit(
  app: INestApplication,
  { oryBasePath, oryAppClientId, oryAppClientScopes }: OrySecrets,
) {
  const config = new DocumentBuilder()
    .setTitle('kreativious-backend')
    .addOAuth2({
      name: 'oauth2',
      type: 'oauth2',
      scheme: 'securityScheme',
      description: 'OAuth2',
      flows: {
        implicit: {
          authorizationUrl: `${oryBasePath}/oauth2/auth`,
          scopes: oryAppClientScopes.reduce(
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
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config), {
    yamlDocumentUrl: '/yaml',
    jsonDocumentUrl: '/json',
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      oauth2RedirectUrl: 'http://localhost:5173/docs/oauth2-redirect.html',
      initOAuth: {
        clientId: oryAppClientId,
      },
    },
  });
}
