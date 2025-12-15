import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async createAddress(createAddressDto: CreateAddressDto) {
    const address = this.addressRepository.create(createAddressDto);
    return await this.addressRepository.save(address);
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
