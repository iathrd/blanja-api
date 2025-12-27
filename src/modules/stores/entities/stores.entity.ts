import { Address } from 'src/modules/address/entities/address.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('stores')
export class Stores {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  address_id: number;

  @Column()
  name: string;

  @OneToMany(() => Address, (address) => address.stores, {
    cascade: true,
  })
  addressStore: Address[];
}
