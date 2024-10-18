import { Injectable, InternalServerErrorException } from '@nestjs/common';
import ShippingAddressDto from './dto/shipping-address.dto';
import { ShippingAddressRepository } from './shipping-address.repository';

@Injectable()
export class ShippingAddressService {
  constructor(
    private readonly shippingAddressRepository: ShippingAddressRepository,
  ) {}

  async createShippingAddress(createShippingAddress: ShippingAddressDto) {
    try {
      const shippingAddress = await this.shippingAddressRepository.create(
        createShippingAddress,
      );
      return shippingAddress;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
