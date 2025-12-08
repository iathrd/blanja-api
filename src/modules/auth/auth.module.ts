import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtConfigModule } from 'src/core/jwt/jwt.module';

@Module({
  imports: [JwtConfigModule],
  providers: [AuthService],
})
export class AuthModule {}
