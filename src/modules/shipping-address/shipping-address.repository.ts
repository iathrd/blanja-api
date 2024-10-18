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
}
