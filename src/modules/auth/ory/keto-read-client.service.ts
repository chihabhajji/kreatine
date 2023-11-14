import { Injectable } from '@nestjs/common';
import { RelationTupleWithReplacements } from '@nidomiro/relation-tuple-parser';
import { PossibleReplacements } from './possible-replacements';
import { CheckServiceClient } from '@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/check_service_grpc_pb';
import * as grpc from '@grpc/grpc-js';
import { defekt, error as dError, Result, value } from 'defekt';
import { KetoGrpcConverter } from '@nidomiro/relation-tuple-parser-ory-keto';

export class UnknownError extends defekt({ code: 'UNKNOWN_ERROR' }) {}

@Injectable()
export class KetoReadClientService {
  private readonly _checkClient: CheckServiceClient;

  constructor() {
    this._checkClient = new CheckServiceClient(
      'http://localhost:4000',
      grpc.credentials.createInsecure(),
    );
  }

  validateRelationTuple(
    relationTuple: RelationTupleWithReplacements<PossibleReplacements>,
    replacements: PossibleReplacements,
  ): Promise<Result<{ allowed: boolean }, UnknownError>> {
    const checkRequest = KetoGrpcConverter.createCheckRequest(
      relationTuple,
      replacements,
    );

    return new Promise((resolve) => {
      this._checkClient.check(
        checkRequest,
        (error: grpc.ServiceError | null, response) => {
          if (error) {
            switch (error.code) {
              case grpc.status.NOT_FOUND:
                resolve(value({ allowed: false as boolean }));
                return;
              default:
                resolve(dError(new UnknownError({ data: error })));
                return;
            }
          }
          resolve(value({ allowed: response.getAllowed() }));
        },
      );
    });
  }
}
