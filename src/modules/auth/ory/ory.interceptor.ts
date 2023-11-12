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
import { OryIdentity } from './ory.entity';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { OrySecrets } from './ory.config';

@Injectable()
export class OryAuthInterceptor implements NestInterceptor {
  private readonly JwkApi: WellknownApi;
  constructor(configService: ConfigService) {
    const { oryBasePath, oryAccessToken } = configService.getOrThrow(
      'ory',
    ) as OrySecrets;
    this.JwkApi = new WellknownApi(
      new Configuration({
        // TODO: Env
        basePath: oryBasePath,
        accessToken: oryAccessToken,
        baseOptions: {
          withCredentials: true,
        },
      }),
    );
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<void>> {
    try {
      const req = context.switchToHttp().getRequest<Request>();

      const token = this.extractToken(req);
      const jwKeySet = await this.JwkApi.discoverJsonWebKeys();
      const publicKey = jwktopem(jwKeySet?.data.keys?.[0] as jwktopem.JWK);
      const decoded = verify(token, publicKey);
      req.session = decoded as OryIdentity;
      return next.handle();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private extractToken(req: Request): string {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }

    return authorizationHeader.split('Bearer ')[1];
  }
}
