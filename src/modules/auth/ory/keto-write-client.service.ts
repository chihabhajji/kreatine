import { Injectable } from '@nestjs/common';
import { RelationTuple } from '@nidomiro/relation-tuple-parser';
import { RelationshipApi } from '@ory/keto-client';
import { error, Result, value } from 'defekt';
import { KetoHttpConverter } from '@nidomiro/relation-tuple-parser-ory-keto';
import { UnknownError } from './keto-read-client.service';
import { isJSON } from 'class-validator';

@Injectable()
export class KetoWriteClientService {
  private readonly _writeClient: RelationshipApi;

  constructor() {
    this._writeClient = new RelationshipApi(
      {
        basePath: 'http://localhost:4000',
        accessToken: 'sG1KrBNHa-h0Sq-K4QO2jj_qR',
        isJsonMime(mime: string): boolean {
          return isJSON(mime);
        },
      },
      'http://localhost:4000',
    );
  }

  async addRelationTuple(
    tuple: RelationTuple,
  ): Promise<Result<true, UnknownError>> {
    const query = KetoHttpConverter.createRelationQuery(tuple);
    try {
      await this._writeClient.createRelationship({
        createRelationshipBody: query,
      });
      return value(true);
    } catch (e) {
      return error(new UnknownError({ data: e }));
    }
  }
}
