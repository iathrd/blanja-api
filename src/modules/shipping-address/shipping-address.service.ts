import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  async getShippingAddress(id: string) {
    try {
      const shippingAddress = await this.shippingAddressRepository.findOne(id);

      if (!shippingAddress) {
        return new NotFoundException(
          'Shipping address not found',
        ).getResponse();
      }

      return shippingAddress;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getShippingAddresses(userId: string) {
    try {
      const shippingAddresses =
        await this.shippingAddressRepository.findAll(userId);

      if (!shippingAddresses) {
        return new NotFoundException(
          'Shipping addresses not found',
        ).getResponse();
      }

      return shippingAddresses;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
