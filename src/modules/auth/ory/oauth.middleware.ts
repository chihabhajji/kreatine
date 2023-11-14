import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getGuardingRelationTuple } from './guarded-by.decorator';
import { IncomingMessage } from 'http';
import * as Url from 'url';
import { KetoReadClientService } from './keto-read-client.service';
import assertNever from 'assert-never/index';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { FrontendApi } from '@ory/client';
import { isJSON } from 'class-validator';

@Injectable()
export class KetoGuard implements CanActivate {
  constructor(
    private readonly _reflector: Reflector,
    private readonly _ketoReadClient: KetoReadClientService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();

    const relationTuple = getGuardingRelationTuple(
      this._reflector,
      context.getHandler(),
    );

    if (relationTuple === null) {
      return false; // Deny every request by default
    }

    const userId = await this.getUserId(ctx);
    const ketoResult = await this._ketoReadClient.validateRelationTuple(
      relationTuple,
      {
        currentUserId: userId ?? 'Unauthorized',
      },
    );

    if (ketoResult.hasError()) {
      const { error } = ketoResult;
      switch (error.code) {
        case 'UNKNOWN_ERROR':
          throw error;
        default:
          assertNever(error.code);
      }
    }

    return ketoResult.value.allowed;
  }

  /**
   * Extracts the userId from query-parameters.
   * This is only for demonstration purposes.
   *
   * NEVER use this approach in production!
   *
   * @param ctx
   * @private
   */
  private async getUserId(ctx: HttpArgumentsHost): Promise<string | null> {
    const request = ctx.getRequest<IncomingMessage>();
    console.log(request.headers.cookie);
    const frontEndApi = new FrontendApi({
      accessToken: 'sG1KrBNHa-h0Sq-K4QO2jj_qR',
      basePath: 'http://localhost:4000',
      isJsonMime(mime: string): boolean {
        return isJSON(mime);
      },
      baseOptions: {
        withCredentials: true,
      },
    });
    const user = await frontEndApi.toSession({
      cookie: request.headers.cookie,
    });
    console.log(user.data);
    const { userId: rawUserId } = Url.parse(request.url, true).query;

    if (Array.isArray(rawUserId)) {
      return rawUserId[0];
    } else {
      return rawUserId ?? null;
    }
  }
}
