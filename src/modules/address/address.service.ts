import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async createAddress(createAddressDto: CreateAddressDto) {
    const address = new Address();
    address.address = createAddressDto.address;
    address.district = createAddressDto.district;
    address.phone_number = createAddressDto.phone_number;
    address.province = createAddressDto.province;
    address.sub_district = createAddressDto.sub_district;
    address.postal_code = createAddressDto.postal_code;

    await this.addressRepository.save(address);

    return address;
  }
}
