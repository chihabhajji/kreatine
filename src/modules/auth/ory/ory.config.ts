import { registerAs } from '@nestjs/config';
import { IsString, IsUrl } from 'class-validator';

export class OrySecrets {
  @IsUrl()
  oryBasePath: string;
  @IsString()
  oryAccessToken: string;
}

export default registerAs('ory', () => {
  return {
    oryBasePath: process.env.ORY_URL,
    oryAccessToken: process.env.ORY_TOKEN,
  } as OrySecrets;
});
