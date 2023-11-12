import { Injectable } from '@nestjs/common';
import OryIdentityService from './ory/ory-identity.service';

@Injectable()
export class AuthService {
  constructor(private readonly oryIdentityService: OryIdentityService) {}

  getHello(): string {
    return 'aa';
  }
}
