import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { DataSource, Repository } from 'typeorm';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CreateUserAddressDto } from './dto/create-user-address.dto';

import { UserAddress } from './entities/user_address.entity';
import { IUserAddress } from 'src/common/types/address.type';
import { UpdateUserAddressDto } from './dto/update-user-address.do';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(UserAddress)
    private userAddressRepository: Repository<UserAddress>,
    private dataSource: DataSource,
  ) {}

  async getUserAddress(userId: string): Promise<IUserAddress[]> {
    const query = this.userAddressRepository.createQueryBuilder('ua');
    const addresses: IUserAddress[] = await query
      .innerJoin('ua.address', 'a')
      .select([
        'a.id AS id',
        'ua.recipient_name AS recipient_name',
        'ua.as AS label',
        'ua.is_default AS is_default',
        'a.phone_number AS phone_number',
        'a.address AS address',
        'a.province AS province',
        'a.district AS district',
        'a.sub_district AS sub_district',
        'a.postal_code AS postal_code',
      ])
      .where('ua.user_id = :userId', { userId })
      .orderBy('ua.is_default', 'DESC')
      .getRawMany();

    if (!addresses.length) {
      throw new NotFoundException('User address not found');
    }

    return addresses;
  }

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
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

  async updateUserAddress(
    userAddressId: number,
    updateUserAddressDto: UpdateUserAddressDto,
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
      } = updateUserAddressDto;

      const userAddress = await manager.findOne(UserAddress, {
        where: { address_id: userAddressId },
      });

      if (!userAddress) {
        throw new NotFoundException('User address not found');
      }

      const addressEntity = await manager.findOne(Address, {
        where: { id: userAddress.address_id },
      });

      if (!addressEntity) {
        throw new NotFoundException('Address not found');
      }

      manager.merge(Address, addressEntity, {
        address,
        district,
        phone_number,
        postal_code,
        province,
        sub_district,
      });

      await manager.save(addressEntity);

      manager.merge(UserAddress, userAddress, {
        as,
        is_default,
        recipient_name,
      });

      await manager.save(userAddress);

      return {
        ...addressEntity,
        ...userAddress,
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
