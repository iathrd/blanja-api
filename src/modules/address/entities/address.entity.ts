import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserAddress } from './user_address.entity';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone_number: string;

  @Column()
  address: string;

  @Column()
  province: string;

  @Column()
  district: string;

  @Column()
  sub_district: string;

  @Column()
  postal_code: string;

  @OneToMany(() => UserAddress, (ua) => ua.address, {
    cascade: true,
  })
  userAddresses: UserAddress[];
}
