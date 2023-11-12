import { defineConfig, Options } from '@mikro-orm/mongodb';
import UserSchema from '../../modules/users/user.schema';
import { registerAs } from '@nestjs/config';
import { IsString, IsUrl } from 'class-validator';

export class DatabaseSecrets {
  @IsString()
  databaseName: string;

  @IsUrl()
  databaseUri: string;
}

export default registerAs('database', () => {
  return {
    databaseUri: process.env.MONGO_URI,
    databaseName: process.env.MONGO_DB_NAME,
  } as DatabaseSecrets;
});

export const mikroOrmConfig: (cfg: DatabaseSecrets) => Options = ({
  databaseUri,
  databaseName,
}: DatabaseSecrets) =>
  defineConfig({
    strict: true,
    dbName: databaseName,
    entities: [UserSchema],
    clientUrl: databaseUri,
  });
