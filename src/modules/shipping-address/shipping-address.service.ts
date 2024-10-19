import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import ShippingAddressDto from './dto/shipping-address.dto';
import { ShippingAddressRepository } from './shipping-address.repository';

@Injectable()
export class ShippingAddressService {
  constructor(
    private readonly shippingAddressRepository: ShippingAddressRepository,
    private readonly logger: Logger,
  ) {}

  SERVICE: string = ShippingAddressService.name;

  async createShippingAddress(createShippingAddress: ShippingAddressDto) {
    try {
      const shippingAddress = await this.shippingAddressRepository.create(
        createShippingAddress,
      );
      return shippingAddress;
    } catch (error) {
      this.logger.error(error.message, error.stack, this.SERVICE);
      return error?.response || new InternalServerErrorException();
    }
  }

  async getShippingAddress(id: string) {
    try {
      const shippingAddress = await this.shippingAddressRepository.findOne(id);

      if (!shippingAddress) {
        throw new NotFoundException('Shipping address not found');
      }

      return shippingAddress;
    } catch (error) {
      this.logger.error(error.message, error.stack, this.SERVICE);
      return error?.response || new InternalServerErrorException();
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
      this.logger.error(error.message, error.stack, this.SERVICE);
      return error?.response || new InternalServerErrorException();
    }
  }
}
