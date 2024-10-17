import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import ShippingAddressDto from './dto/shipping-address.dto';

@Injectable()
export class ShippingAddressService {
  constructor(private prismaService: PrismaService) {}

  async createShippingAddress(createShippingAddress: ShippingAddressDto) {
    try {
      const shippingAddress = await this.prismaService.shippingAddress.create({
        data: createShippingAddress,
      });
      return shippingAddress;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
