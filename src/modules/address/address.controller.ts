import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { GetUser } from 'src/common/decoratos/get-user.decorator';
import { Users } from '../users/entities/user.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decoratos/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin', 'user', 'admin')
@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get()
  getUserAddress(@GetUser() user: Users) {
    return this.addressService.getUserAddress(user.id);
  }

  @Post()
  createAddress(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.createAddress(createAddressDto);
  }

  @Post('user')
  createUserAddress(
    @Body() createUserAddressDto: CreateUserAddressDto,
    @GetUser() user: Users,
  ) {
    return this.addressService.createUserAddress(user.id, createUserAddressDto);
  }

  @Put(':id')
  updateAddress(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.updateAddress(+id, updateAddressDto);
  }
}
