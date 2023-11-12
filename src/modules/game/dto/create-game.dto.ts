// from class validator ccheck password and username

import { IsString, MaxLength, MinLength } from 'class-validator';

export class GameDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;
}
