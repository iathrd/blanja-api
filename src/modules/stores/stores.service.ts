import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stores } from './entities/stores.entity';
import { DataSource, Repository } from 'typeorm';
import { SafeUser } from 'src/common/types/auth.type';
import { CreateStoreDto } from './dto/create-store-dto';

import { Address } from '../address/entities/address.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Stores)
    private storesRepository: Repository<Stores>,
    private dataSource: DataSource,
  ) {}
  async getMyStores(user: SafeUser) {
    return await this.storesRepository
      .createQueryBuilder('store')
      .leftJoinAndSelect('store.address', 'address')
      .where('store.user_id = :userId', { userId: user.id })
      .getMany();
  }

  async getAllStores() {
    return await this.storesRepository
      .createQueryBuilder('store')
      .leftJoinAndSelect('store.address', 'address')

      .getMany();
  }

  async createStore(userId: string, createStoreDto: CreateStoreDto) {
    const {
      address,
      district,
      name,
      phone_number,
      province,
      sub_district,
      postal_code,
    } = createStoreDto;
    return this.dataSource.transaction(async (manager) => {
      const addressData = manager.create(Address, {
        address,
        district,
        phone_number,
        postal_code,
        province,
        sub_district,
      });

      const savedAddress = await manager.save(addressData);

      const store = manager.create(Stores, {
        address_id: savedAddress.id,
        name,
        user_id: userId,
      });

      const savedStore = await manager.save(store);

      return {
        ...savedStore,
        ...savedAddress,
      };
    });
  }

  async getStoreById(id: string, userId: string) {
    return await this.storesRepository
      .createQueryBuilder('store')
      .leftJoinAndSelect('store.address', 'address')
      .where('store.id = :id AND store.user_id = :userId', { id, userId })
      .getOne();
  }
}
