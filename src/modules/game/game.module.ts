import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Game } from './schema/game.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Game]), GameModule], // Include your entity here
  providers: [GameService],
  controllers: [GameController],
})
export class GameModule {}
