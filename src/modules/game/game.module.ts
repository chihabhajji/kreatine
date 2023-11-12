import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';

@Module({
  imports: [GameModule], // Include your entity here
  providers: [GameService],
  controllers: [GameController],
})
export class GameModule {}
