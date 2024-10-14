import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaServis: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: Prisma.UserCreateInput) {
    try {
      const hasedPassword = await argon2.hash(createUserDto.password);
      const user = await this.prismaServis.user.create({
        data: { ...createUserDto, password: hasedPassword },
      });

      return user;
    } catch (error) {
      // Catch Prisma unique constraint violation error
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists.');
      }

      // Handle other Prisma errors
      throw new InternalServerErrorException('Internal server error.');
    }
  }

  async signin(userDto: Prisma.UserCreateInput) {
    const user = await this.prismaServis.user.findUnique({
      where: { email: userDto.email },
    });

    if (!user) {
      throw new ConflictException('Email does not exist.');
    }

    const isPasswordValid = await argon2.verify(
      user.password,
      userDto.password,
    );

    if (!isPasswordValid) {
      throw new ConflictException('email or password is incorrect.');
    }

    const payload = { sub: user.id };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
    };
  }
}
