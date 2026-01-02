import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stores } from './entities/stores.entity';
import { Repository } from 'typeorm';
import { SafeUser } from 'src/common/types/auth.type';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Stores)
    private storesRepository: Repository<Stores>,
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

  async getStoreById(id: string, userId: string) {
    return await this.storesRepository
      .createQueryBuilder('store')
      .leftJoinAndSelect('store.address', 'address')
      .where('store.id = :id AND store.user_id = :userId', { id, userId })
      .getOne();
  }
}
