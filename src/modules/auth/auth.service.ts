import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import IUser from './interfaces/user.interface';
import UpdateUserDto from './dto/update-user.dto';
import { SendgridService } from '../sendgrid/sendgrid.service';
import SendEmailDto from 'src/common/dto/send-emai.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaServis: PrismaService,
    private jwtService: JwtService,
    private cloudinaryService: CloudinaryService,
    private sendgridService: SendgridService,
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

    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
    };
  }
  async updateUserDetail(
    user: IUser,
    file: Express.Multer.File,
    updateUserDto: UpdateUserDto,
  ) {
    try {
      if (!file) {
        return await this.prismaServis.userDetails.upsert({
          where: { userId: user.sub },
          update: {
            phoneNumber: updateUserDto.phoneNumber,
          },
          create: {
            phoneNumber: updateUserDto.phoneNumber,
            userId: user.sub,
          },
        });
      }
      const image = await this.cloudinaryService.uploadImage(file).catch(() => {
        throw new BadRequestException('Invalid file type.');
      });

      return await this.prismaServis.userDetails.upsert({
        where: { userId: user.sub },
        create: {
          phoneNumber: updateUserDto.phoneNumber,
          userId: user.sub,
          image: image.url,
        },
        update: {
          phoneNumber: updateUserDto.phoneNumber,
          image: image.url,
        },
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async getUserDetails(user: IUser) {
    return await this.prismaServis.user.findUnique({
      where: { id: user.sub },
      select: {
        id: true,
        email: true,
        name: true,
        details: true,
      },
    });
  }

  async sendEmail(sendEmailDto: SendEmailDto) {
    return this.sendgridService.sendEmail(sendEmailDto);
  }
}
