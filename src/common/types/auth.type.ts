import { Users } from 'src/modules/users/entities/user.entity';

export type SafeUser = Omit<Users, 'password'>;
