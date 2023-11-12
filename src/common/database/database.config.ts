import { defineConfig, Options } from '@mikro-orm/mongodb';
import { join } from 'path';
import UserSchema from '../../modules/users/user.schema';

const basePath = join(__dirname, '..');

const entitiesPath = join(basePath, 'dist', '**.schema.js');
const entitiesTsPath = join(basePath, 'src', '**.schema.ts');

console.dir({
  entitiesPath,
  entitiesTsPath,
});
export const mikroOrmConfig: Options = defineConfig({
  strict: true,
  dbName: 'form-builder',
  entities: [UserSchema],
  clientUrl:
    'mongodb+srv://chihab:JmILhx418KzmkYic@cluster0.4eh6xyz.mongodb.net/?retryWrites=true&w=majority',
});
