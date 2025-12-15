import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
