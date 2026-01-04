import { Users } from 'src/modules/users/entities/user.entity';

export interface JwtPayload {
  id: string;
  email: string;
  roles: string[];
}

export interface IUserData extends Omit<Users, 'roles'> {
  roles: string[];
}
