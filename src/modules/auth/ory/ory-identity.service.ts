import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrySecrets } from './ory.config';
import { IdentityApi } from '@ory/client';
import { isJSON } from 'class-validator';

@Injectable()
export default class OryIdentityService {
  private readonly identityApi: IdentityApi;
  constructor(configService: ConfigService) {
    const { oryBasePath, oryAccessToken } = configService.getOrThrow(
      'ory',
    ) as OrySecrets;
    this.identityApi = new IdentityApi({
      basePath: oryBasePath,
      accessToken: oryAccessToken,
      baseOptions: {
        withCredentials: true,
      },
      isJsonMime: (mime: string) => isJSON(mime),
    });
  }
  // get session disable session, get user, list users, create user, delete user, update user
}
