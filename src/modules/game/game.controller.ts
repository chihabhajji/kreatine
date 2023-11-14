import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './schema/game.entity';
import { ApiBody, ApiSecurity } from '@nestjs/swagger';
import { GameDto } from './dto/create-game.dto';
import { GuardedBy } from '../auth/ory/guarded-by.decorator';

// @ApiOAuth2()
@ApiSecurity('oauth2', ['email'])
@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @GuardedBy(({ currentUserId }) => `groups:users#member@${currentUserId}`)
  @Get()
  async findAll(@Req() req): Promise<Game[]> {
    console.log(req.user);
    console.log(req.session);
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
