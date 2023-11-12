import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Game {
  id: string;
  @PrimaryKey()
  _id!: string;

  @Property()
  name: string;
}
