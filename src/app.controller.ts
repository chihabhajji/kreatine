import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { OryAuthInterceptor } from './modules/auth/ory/ory.interceptor';

@Controller()
@UseInterceptors(OryAuthInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
