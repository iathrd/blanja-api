import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { DataSource, Repository } from 'typeorm';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CreateUserAddressDto } from './dto/create-user-address.dto';

import { UserAddress } from './entities/user_address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private dataSource: DataSource,
  ) {}

  async createAddress(createAddressDto: CreateAddressDto) {
    const address = this.addressRepository.create(createAddressDto);
    await this.addressRepository.save(address);
    return address;
  }

  async createUserAddress(
    userId: string,
    createUserAddressDto: CreateUserAddressDto,
  ) {
    return this.dataSource.transaction(async (manager) => {
      const {
        address,
        district,
        phone_number,
        postal_code,
        province,
        sub_district,
        as,
        is_default,
        recipient_name,
      } = createUserAddressDto;

      const savedAddress = manager.create(Address, {
        address,
        district,
        phone_number,
        postal_code,
        province,
        sub_district,
      });

      await manager.save(savedAddress);

      const savedUserAddress = manager.create(UserAddress, {
        as,
        is_default,
        recipient_name,
        user_id: userId,
        address_id: savedAddress.id,
      });

      await manager.save(savedUserAddress);

      return {
        ...savedAddress,
        ...savedUserAddress,
      };
    });
  }

  async updateAddress(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { id },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    Object.assign(address, updateAddressDto);

    return await this.addressRepository.save(address);
  }
}
