import { Address } from 'src/modules/address/entities/address.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
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

  @OneToOne(() => Address, { eager: false })
  @JoinColumn({ name: 'address_id' })
  address: Address;
}
