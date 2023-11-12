import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { GameModule } from './modules/game/game.module';
import DatabaseModule from './common/database/database.module';
import { ConfigModule } from '@nestjs/config';
import HealthCheckModule from './common/healthcheck/healthcheck.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    HealthCheckModule,
    AuthModule,
    UsersModule,
    GameModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
