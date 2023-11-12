import { Entity, PrimaryKey } from '@mikro-orm/core';
import { OryIdentity } from '../auth/ory-identity.entity';

@Entity({})
export default class UserSchema implements OryIdentity {
  email: string;
  id: string;
  @PrimaryKey()
  _id!: string;
  internalId: string;
  schema_id: string;
  schema_url: string;
  state: boolean;
  traits: string[];
}
