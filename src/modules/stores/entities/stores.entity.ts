import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stores')
export class Stores {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  address_id: string;

  @Column()
  name: string;
}
