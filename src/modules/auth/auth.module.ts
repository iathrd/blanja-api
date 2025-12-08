import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtConfigModule } from 'src/core/jwt/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtConfigModule,
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
