import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stores } from './entities/stores.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Stores)
    private storesRepository: Repository<Stores>,
  ) {}
  async getStores() {
    return await this.storesRepository
      .createQueryBuilder('store')
      .leftJoinAndSelect('store.addressStore', 'address')
      .getMany();
  }
}
