import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { UserRepository } from './user.repository';
import IUser from './interfaces/user.interface';
import UpdateUserDto from './dto/update-user.dto';
import * as argon2 from 'argon2';
import SendEmailDto from 'src/common/dto/send-emai.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
    private cloudinaryService: CloudinaryService,
    private sendgridService: SendgridService,
  ) {}

  async signup(createUserDto: Prisma.UserCreateInput) {
    try {
      const hasedPassword = await argon2.hash(createUserDto.password);
      const user = await this.userRepository.create({
        ...createUserDto,
        password: hasedPassword,
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
    const user = await this.userRepository.findOneByEmail(userDto.email);

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
        return await this.userRepository.update(user.sub, updateUserDto);
      }
      const image = await this.cloudinaryService.uploadImage(file).catch(() => {
        throw new BadRequestException('Invalid file type.');
      });

      return await this.userRepository.updateWithImage(user.sub, {
        ...updateUserDto,
        image: image.url,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async getUserDetails(user: IUser) {
    return await this.userRepository.findOneById(user.sub);
  }

  async sendEmail(sendEmailDto: SendEmailDto) {
    return this.sendgridService.sendEmail(sendEmailDto);
  }
}
