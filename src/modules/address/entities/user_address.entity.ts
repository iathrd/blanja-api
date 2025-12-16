import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Address } from './address.entity';

@Entity('user_address')
export class UserAddress {
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  address_id: number;

  @Column()
  recipient_name: string;

  @Column()
  as: string;

  @Column()
  is_default: boolean;

  @ManyToOne(() => Address, (address) => address.userAddresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;
}
