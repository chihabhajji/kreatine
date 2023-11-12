import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/mongodb';
import { Game } from './schema/game.entity';
import { GameDto } from './dto/create-game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: EntityRepository<Game>,
    private readonly em: EntityManager,
  ) {}

  async findAll(): Promise<Game[]> {
    return await this.gameRepository.findAll();
  }

  async findOne(id: string): Promise<Game | null> {
    return await this.gameRepository.findOne({ id });
  }

  async create(gameData: GameDto): Promise<Game> {
    const game = this.gameRepository.create(gameData); // Create a new Game entity
    await this.em.persistAndFlush(game); // Persist it to the database
    return game;
  }
}
