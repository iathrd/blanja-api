import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { EncryptionService } from 'src/core/encryption/encryption.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRoles } from '../roles/entities/user-roles.entity';
import { CreateUserStoreDto } from './dto/create-user-store';
import { Stores } from '../stores/entities/stores.entity';
import { Address } from '../address/entities/address.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private encryptionService: EncryptionService,
    private dataSource: DataSource,
  ) {}

  async registerUserStore(CreateUserStoreDto: CreateUserStoreDto) {
    return this.dataSource.transaction(async (manager) => {
      const {
        store_name,
        email,
        name,
        password,
        phone_number,
        profile_picture,
        role_ids,
        address,
        city,
        postal_code,
        province,
        district,
        sub_district,
      } = CreateUserStoreDto;

      const hashedPassword =
        await this.encryptionService.hashPassword(password);

      const user = manager.create(Users, {
        name,
        email,
        password: hashedPassword,
        phone_number,
        profile_picture,
      });

      const savedUser = await manager.save(user);

      const userRoles = role_ids.map((roleId) => ({
        user_id: savedUser.id,
        role_id: roleId,
      }));

      await manager.insert(UserRoles, userRoles);

      const addressData = manager.create(Address, {
        phone_number,
        address,
        city,
        postal_code,
        province,
        district,
        sub_district,
      });

      const savedAddress = await manager.save(addressData);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const store = manager.create(Stores, {
        user_id: savedUser.id,
        address_id: +savedAddress.id,
        name: store_name,
      });

      return await manager.save(store);
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { email, name, password, phone_number, profile_picture, role_ids } =
        createUserDto;

      const hashedPassword =
        await this.encryptionService.hashPassword(password);

      const user = queryRunner.manager.create(Users, {
        name,
        email,
        password: hashedPassword,
        phone_number,
        profile_picture,
      });

      const savedUser = await queryRunner.manager.save(user);

      const userRoles = role_ids.map((roleId) => ({
        user_id: savedUser.id,
        role_id: roleId,
      }));

      await queryRunner.manager.insert(UserRoles, userRoles);

      await queryRunner.commitTransaction();

      return savedUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error?.code === '23505') {
        throw new BadRequestException(
          'User with the same email or phone number already exists',
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error?.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(
          'User with the same email or phone number already exists',
        );
      }
      throw error; // rethrow for global exception filter
    } finally {
      await queryRunner.release();
    }
  }

  async getUser(id: string) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.role', 'role')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException();
    }

    return {
      ...user,
      roles: user.roles.map((ur) => ur.role.name),
    };
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.role', 'role')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new NotFoundException();
    }

    return {
      ...user,
      roles: user.roles.map((ur) => ur.role.name),
    };
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.dataSource.transaction(async (manager) => {
      const { email, name, phone_number, profile_picture, role_ids } =
        updateUserDto;

      const user = await manager.findOne(Users, { where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      user.name = name ?? user.name;
      user.email = email ?? user.email;
      user.phone_number = phone_number ?? user.phone_number;
      user.profile_picture = profile_picture ?? user.profile_picture;

      await manager.save(user);

      if (role_ids && role_ids.length > 0) {
        await manager.delete(UserRoles, { userId: id });

        const userRoles = role_ids.map((roleId) => ({
          user_id: id,
          role_id: roleId,
        }));

        await manager.insert(UserRoles, userRoles);
      }

      return user;
    });
  }
}
