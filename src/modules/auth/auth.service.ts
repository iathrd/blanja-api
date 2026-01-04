import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { EncryptionService } from 'src/core/encryption/encryption.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvSchema } from 'src/config/env.schema';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateUserStoreDto } from '../users/dto/create-user-store';
import { JwtPayload } from 'src/common/types/user.type';

@Injectable()
export class AuthService {
  constructor(
    private encryptionService: EncryptionService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService<EnvSchema>,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.getUserByEmail(signInDto.email);

    if (!user) {
      throw new BadRequestException('wrong email or password');
    }

    const valid = await this.encryptionService.verify(
      user.password,
      signInDto.password,
    );

    if (!valid) {
      throw new BadRequestException('wrong email or password');
    }

    const payload = { id: user.id, email: user.email, roles: user.roles };
    const secret = this.configService.get<string>('JWT_SECRET');

    const accessToken = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn: '3h',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn: '7d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const secret = this.configService.get<string>('JWT_SECRET');

      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        refreshToken,
        { secret },
      );

      const user = await this.usersService.getUser(payload.id);
      if (!user) {
        throw new BadRequestException('Invalid refresh token');
      }

      const newPayload: JwtPayload = {
        id: user.id,
        email: user.email,
        roles: user.roles,
      };

      return {
        access_token: await this.jwtService.signAsync(newPayload, {
          secret,
          expiresIn: '3h',
        }),
      };
    } catch {
      throw new BadRequestException('Invalid or expired refresh token');
    }
  }

  async signUp(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  async registerUserStore(createUserStoreDto: CreateUserStoreDto) {
    return this.usersService.registerUserStore(createUserStoreDto);
  }
}
