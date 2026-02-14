import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CreateUserAddressDto } from './dto/create-user-address.dto';

import { GetUser } from 'src/common/decoratos/get-user.decorator';
import { Users } from '../users/entities/user.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decoratos/roles.decorator';
import { UpdateUserAddressDto } from './dto/update-user-address.do';

@ApiTags('Address')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin', 'user', 'admin')
@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user addresses' })
  @ApiResponse({ status: 200, description: 'List of user addresses' })
  getUserAddress(@GetUser() user: Users) {
    return this.addressService.getUserAddress(user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create base address (admin use)' })
  @ApiResponse({ status: 201, description: 'Address created successfully' })
  createAddress(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.createAddress(createAddressDto);
  }

  @Put('user/:id')
  @ApiOperation({ summary: 'Update user address by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'User address updated successfully',
  })
  updateUserAddress(
    @Param('id') id: string,
    @Body() updateUserAddressDto: UpdateUserAddressDto,
  ) {
    return this.addressService.updateUserAddress(+id, updateUserAddressDto);
  }

  @Post('user')
  @ApiOperation({ summary: 'Create address for logged-in user' })
  @ApiResponse({
    status: 201,
    description: 'User address created successfully',
  })
  createUserAddress(
    @Body() createUserAddressDto: CreateUserAddressDto,
    @GetUser() user: Users,
  ) {
    return this.addressService.createUserAddress(user.id, createUserAddressDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update address by ID (admin)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Address updated successfully' })
  updateAddress(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.updateAddress(+id, updateAddressDto);
  }
}
