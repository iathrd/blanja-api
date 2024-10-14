import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async signin() {
    return 'signin';
  }
}
