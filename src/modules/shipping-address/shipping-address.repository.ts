import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import ShippingAddressDto from './dto/shipping-address.dto';

@Injectable()
export class ShippingAddressRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRepositoryDto: ShippingAddressDto) {
    return this.prismaService.shippingAddress.create({
      data: createRepositoryDto,
    });
  }

  async findOne(id: string) {
    return this.prismaService.shippingAddress.findUnique({
      where: { id },
    });
  }

  async findAll(id: string) {
    return this.prismaService.shippingAddress.findMany({
      where: { userId: id },
    });
  }
}
