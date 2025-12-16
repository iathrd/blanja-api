import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { UserAddress } from './entities/user_address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, UserAddress])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
