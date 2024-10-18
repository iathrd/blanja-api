import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import UpdateUserDto from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async findOneById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        details: true,
      },
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({ data });
  }

  async updateWithImage(id: string, data: UpdateUserDto) {
    return this.prismaService.userDetails.upsert({
      where: { userId: id },
      create: {
        phoneNumber: data.phoneNumber,
        userId: id,
        image: data.image,
      },
      update: {
        phoneNumber: data.phoneNumber,
        image: data.image,
      },
    });
  }

  async update(id: string, data: UpdateUserDto) {
    return this.prismaService.userDetails.upsert({
      where: { userId: id },
      update: {
        phoneNumber: data.phoneNumber,
      },
      create: {
        phoneNumber: data.phoneNumber,
        userId: id,
      },
    });
  }
}
