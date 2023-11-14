import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';

@Entity()
export class Game {
  @PrimaryKey()
  _id: string;

  @SerializedPrimaryKey()
  id!: string; // won't be saved in the database

  @Property()
  name: string;
}
