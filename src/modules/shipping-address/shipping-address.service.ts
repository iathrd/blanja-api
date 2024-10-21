import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import ShippingAddressDto from './dto/shipping-address.dto';
import { ShippingAddressRepository } from './shipping-address.repository';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class ShippingAddressService {
  constructor(
    private readonly shippingAddressRepository: ShippingAddressRepository,
    private readonly logger: Logger,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
      const cacheKey = `shipping-address-${id}`;
      // Check if the data is in the cache
      const cacheData = await this.cacheManager.get(cacheKey);

      if (cacheData) {
        return cacheData;
      }
      const shippingAddress = await this.shippingAddressRepository.findOne(id);

      if (!shippingAddress) {
        throw new NotFoundException('Shipping address not found');
      }

      // Store the data in the cache for 5 minutes
      await this.cacheManager.set(cacheKey, shippingAddress, 5 * 60 * 1000);

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
        throw new NotFoundException('Shipping addresses not found');
      }

      return { data: shippingAddresses };
    } catch (error) {
      this.logger.error(error.message, error.stack, this.SERVICE);
      return error?.response || new InternalServerErrorException();
    }
  }

  async updateShippingAddress(
    id: string,
    updateShippingAddress: ShippingAddressDto,
  ) {
    try {
      const cacheKey = `shipping-address-${id}`;

      // Delete the cache
      await this.cacheManager.del(cacheKey);

      const shippingAddress = await this.shippingAddressRepository.update(
        id,
        updateShippingAddress,
      );

      return shippingAddress;
    } catch (error) {
      this.logger.error(error.message, error.stack, this.SERVICE);
      return error?.response || new InternalServerErrorException();
    }
  }

  async deleteShippingAddress(id: string) {
    try {
      const cacheKey = `shipping-address-${id}`;

      // Delete the cache
      await this.cacheManager.del(cacheKey);

      const shippingAddress = await this.shippingAddressRepository.delete(id);

      return shippingAddress;
    } catch (error) {
      this.logger.error(error.message, error.stack, this.SERVICE);
      return error?.response || new InternalServerErrorException();
    }
  }
}
