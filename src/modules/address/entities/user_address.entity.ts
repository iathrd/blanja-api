import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}
