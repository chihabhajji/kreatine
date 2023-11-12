import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Game } from './schema/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: EntityRepository<Game>,
  ) {}

  async findAll(): Promise<Game[]> {
    return await this.gameRepository.findAll();
  }

  async findOne(id: string): Promise<Game> {
    return await this.gameRepository.findOne({ id });
  }

  async create(gameData: Partial<Game>): Promise<Game> {
    return this.gameRepository.create(gameData);
  }
}
