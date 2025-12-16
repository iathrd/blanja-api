import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from 'src/modules/users/entities/user.entity';
import { Roles } from './roles.entity';

@Entity('user_roles')
export class UserRoles {
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  role_id: number;

  @ManyToOne(() => Users, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Roles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: Roles;
}
