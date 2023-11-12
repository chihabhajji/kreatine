import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Configuration, WellknownApi } from '@ory/client';
import { verify } from 'jsonwebtoken';
import jwktopem from 'jwk-to-pem';
import { OryIdentity } from './ory-identity.entity';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  private readonly JwkApi = new WellknownApi(
    new Configuration({
      // TODO: Env
      basePath: 'https://infallible-brattain-buzagnyuc0.projects.oryapis.com',
      accessToken: 'ory_pat_n3DPSlMW6IXlbD5rAuHqHawItKa1ObuG',
      baseOptions: {
        withCredentials: true,
      },
    }),
  );
  constructor() {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<void>> {
    // Extract the request object and headers
    const req = context.switchToHttp().getRequest() as Request;
    if (req.headers.authorization) {
      const token = req.headers.authorization.split('Bearer ')[1];
      if (token) {
        // We fetch the JWK's using the private Admin SDK
        this.JwkApi.discoverJsonWebKeys()
          .then(({ data: jwKeySet }) => {
            // We verify the token using the public key
            const publicKey = jwktopem(jwKeySet?.keys?.at(0) as jwktopem.JWK);
            const decoded = verify(token, publicKey);
            // Exchange it for session info expanded with the identity traits
            if (typeof decoded === 'string') {
              console.log('decoded is string!!!!!!!');
            } else {
              req.session = decoded as OryIdentity;
            }
            return next.handle();
          })
          .catch(() => {
            throw new UnauthorizedException();
          });
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
    return next.handle();
  }
}
