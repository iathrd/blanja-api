import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post()
  createAddress(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.createAddress(createAddressDto);
  }

  @Put(':id')
  updateAddress(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.updateAddress(+id, updateAddressDto);
  }
}
