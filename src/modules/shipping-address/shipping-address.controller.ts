import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import ShippingAddressDto from './dto/shipping-address.dto';
import { ShippingAddressService } from './shipping-address.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import IUser from '../auth/interfaces/user.interface';

@Controller('shipping-address')
export class ShippingAddressController {
  constructor(private shippingAddressService: ShippingAddressService) {}

  @UseGuards(AuthGuard)
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
}
