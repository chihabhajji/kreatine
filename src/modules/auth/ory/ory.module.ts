import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import oryConfig from './ory.config';
import { OryAuthInterceptor } from './ory.interceptor';
import OryIdentityService from './ory-identity.service';

@Module({
  imports: [ConfigModule.forFeature(oryConfig)],
  providers: [OryIdentityService, OryAuthInterceptor],
  controllers: [],
  exports: [OryIdentityService, OryAuthInterceptor],
})
export default class OryModule {}
