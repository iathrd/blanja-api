import { Module } from '@nestjs/common';
import { ShippingAddressController } from './shipping-address.controller';
import { ShippingAddressService } from './shipping-address.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ShippingAddressRepository } from './shipping-address.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ShippingAddressController],
  providers: [ShippingAddressService, ShippingAddressRepository],
})
export class ShippingAdressModule {}
