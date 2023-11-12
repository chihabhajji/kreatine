import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { mikroOrmConfig } from './database.config';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig)],
})
export class DatabaseModule {}
