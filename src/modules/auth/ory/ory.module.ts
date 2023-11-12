import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import oryConfig from './ory.config';
import { OryAuthInterceptor } from './ory.interceptor';

@Module({
  imports: [ConfigModule.forFeature(oryConfig)],
  providers: [OryAuthInterceptor],
  controllers: [],
  exports: [OryAuthInterceptor],
})
export default class OryModule {}
