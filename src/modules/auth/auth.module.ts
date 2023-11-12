import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import OryModule from './ory/ory.module';

@Module({
  imports: [OryModule],
  providers: [AuthService],
  exports: [AuthService, OryModule],
})
export class AuthModule {}
