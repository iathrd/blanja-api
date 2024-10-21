import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import ShippingAddressDto from './dto/shipping-address.dto';
import { ShippingAddressService } from './shipping-address.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import IUser from '../auth/interfaces/user.interface';

@UseGuards(AuthGuard)
@Controller('shipping-address')
export class ShippingAddressController {
  constructor(private shippingAddressService: ShippingAddressService) {}

  @Post()
  async createShippingAddress(
    @Body() shippingAddressDto: ShippingAddressDto,
    @User() user: IUser,
  ) {
    return this.shippingAddressService.createShippingAddress({
      ...shippingAddressDto,
      userId: user.sub,
    });
  }

  @Get(':id')
  async getShippingAddress(@Param('id') id: string) {
    return this.shippingAddressService.getShippingAddress(id);
  }

  @Put(':id')
  async updateShippingAddress(
    @Param('id') id: string,
    @Body() shippingAddressDto: ShippingAddressDto,
  ) {
    return this.shippingAddressService.updateShippingAddress(
      id,
      shippingAddressDto,
    );
  }

  @Get()
  async getShippingAddresses(@User() user: IUser) {
    return this.shippingAddressService.getShippingAddresses(user.sub);
  }
}
