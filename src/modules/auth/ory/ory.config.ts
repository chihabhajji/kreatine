import { registerAs } from '@nestjs/config';
import { IsArray, IsString, IsUrl } from 'class-validator';

export class OrySecrets {
  @IsString()
  oryAppName: string;
  @IsUrl()
  oryBasePath: string;
  @IsString()
  oryAccessToken: string;
  @IsString()
  oryAppClientId: string;
  @IsString()
  oryAppClientSecret: string;
  @IsArray()
  @IsString({ each: true })
  oryAppClientScopes: string[];
}
export default registerAs('ory', () => {
  return {
    oryAppName: process.env.ORY_APP_NAME,
    oryBasePath: process.env.ORY_SDK_URL,
    oryAccessToken: process.env.ORY_SDK_TOKEN,
    oryAppClientId: process.env.ORY_APP_CLIENT_ID,
    oryAppClientSecret: process.env.ORY_APP_CLIENT_SECRET,
    oryAppClientScopes: process.env.ORY_APP_CLIENT_SCOPES.split(','),
  } as OrySecrets;
});
