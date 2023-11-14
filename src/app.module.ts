import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { GameModule } from './modules/game/game.module';
import DatabaseModule from './common/database/database.module';
import { ConfigModule } from '@nestjs/config';
import HealthCheckModule from './common/healthcheck/healthcheck.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { KetoGuard } from './modules/auth/ory/oauth.middleware';
import { KetoReadClientService } from './modules/auth/ory/keto-read-client.service';
import { KetoWriteClientService } from './modules/auth/ory/keto-write-client.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    DatabaseModule,
    HealthCheckModule,
    AuthModule,
    UsersModule,
    GameModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({}),
    },
    KetoReadClientService,
    KetoWriteClientService,
    KetoGuard,
    {
      provide: APP_GUARD,
      useExisting: KetoGuard,
    },
  ],
})
export class AppModule {}
