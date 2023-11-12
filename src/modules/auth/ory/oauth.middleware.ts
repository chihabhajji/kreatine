// auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { randomBytes } from 'crypto';
import { auth } from 'express-openid-connect';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    auth({
      authRequired: false,
      baseURL: 'http://localhost:3000',
      secret: process.env.ENCRYPTION_SECRET || randomBytes(64).toString('hex'),
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      issuerBaseURL: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
      authorizationParams: {
        response_type: 'code',
        scope: 'openid email offline_access',
      },
    })(req, res, next);
  }
}
