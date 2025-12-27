import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { EncryptionService } from 'src/core/encryption/encryption.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvSchema } from 'src/config/env.schema';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateUserStoreDto } from '../users/dto/create-user-store';

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

    const valid = await this.encryptionService.verifyPassword(
      user.password,
      signInDto.password,
    );

    if (!valid) {
      throw new BadRequestException('wrong email or password');
    }

    const payload = { id: user.id, email: user.email, roles: user.roles };
    const secret = this.configService.get<string>('JWT_SECRET');

    console.log('payload', payload);

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

  async signUp(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  async registerUserStore(createUserStoreDto: CreateUserStoreDto) {
    return this.usersService.registerUserStore(createUserStoreDto);
  }
}
