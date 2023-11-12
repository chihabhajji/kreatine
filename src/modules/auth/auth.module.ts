import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import oryConfig from '../ory/ory.config';

@Module({
  imports: [ConfigModule.forFeature(oryConfig)],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
