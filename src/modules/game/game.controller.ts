import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './schema/game.entity';
import { ApiBody } from '@nestjs/swagger';
import { GameDto } from './dto/create-game.dto';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  async findAll(): Promise<Game[]> {
    return await this.gameService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Game> {
    return await this.gameService.findOne(id);
  }

  @ApiBody({ type: GameDto })
  @Post()
  async create(@Body() gameData: GameDto): Promise<Game> {
    return await this.gameService.create(gameData);
  }
}
