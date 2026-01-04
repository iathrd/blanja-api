import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { EncryptionService } from 'src/core/encryption/encryption.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRoles } from '../roles/entities/user-roles.entity';
import { CreateUserStoreDto } from './dto/create-user-store';
import { Stores } from '../stores/entities/stores.entity';
import { Address } from '../address/entities/address.entity';
import { RedisService } from 'src/core/redis/redis.service';
import { CacheKeys } from 'src/core/redis/cache.keys';
import { duplicateError } from 'src/common/utils/errors';
import { CreateAddressDto } from '../address/dto/create-address.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private encryptionService: EncryptionService,
    private dataSource: DataSource,
    private redisService: RedisService,
  ) {}

  async txInsertUser(
    manager: EntityManager,
    createUserDto: CreateUserDto,
  ): Promise<Users> {
    const { email, name, password, phone_number, profile_picture, role_ids } =
      createUserDto;

    try {
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

      return savedUser;
    } catch (error) {
      duplicateError(error, 'Email already exists');

      throw error;
    }
  }

  async txInsertAddress(
    manager: EntityManager,
    createAddressDto: CreateAddressDto,
  ): Promise<Address> {
    const {
      address,
      district,
      phone_number,
      postal_code,
      province,
      sub_district,
    } = createAddressDto;

    const addressData = manager.create(Address, {
      phone_number,
      address,
      postal_code,
      province,
      district,
      sub_district,
    });

    const savedAddress = await manager.save(addressData);

    return savedAddress;
  }

  async registerUserStore(createUserStoreDto: CreateUserStoreDto) {
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
        postal_code,
        province,
        district,
        sub_district,
      } = createUserStoreDto;

      const savedUser = await this.txInsertUser(manager, {
        email,
        name,
        password,
        phone_number,
        profile_picture,
        role_ids,
      });

      const savedAddress = await this.txInsertAddress(manager, {
        address,
        district,
        phone_number,
        postal_code,
        province,
        sub_district,
      });

      const store = manager.create(Stores, {
        user_id: savedUser.id,
        address_id: +savedAddress.id,
        name: store_name,
      });

      return await manager.save(store);
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, name, password, phone_number, profile_picture, role_ids } =
      createUserDto;

    return this.dataSource.transaction(async (manager) => {
      const savedUser = this.txInsertUser(manager, {
        email,
        name,
        password,
        phone_number,
        profile_picture,
        role_ids,
      });

      return savedUser;
    });
  }

  async getUser(id: string) {
    const cacheKey = CacheKeys.users.byId(id);

    const cached = await this.redisService.get<Users>(cacheKey);
    if (cached) return cached;

    const user = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.role', 'role')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException();
    }

    const response = {
      ...user,
      roles: user.roles.map((ur) => ur.role.name),
    };

    await this.redisService.set(cacheKey, response, 300);

    return response;
  }

  async getUserByEmail(email: string) {
    const cacheKey = CacheKeys.users.byId(email);

    const cached = await this.redisService.get<Users & { roles: string[] }>(
      cacheKey,
    );
    if (cached) return cached;

    const user = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.role', 'role')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new NotFoundException();
    }

    const response = {
      ...user,
      roles: user.roles.map((ur) => ur.role.name),
    };

    await this.redisService.set(cacheKey, response, 300);

    return response;
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

      await this.redisService.del(CacheKeys.users.byId(id));
      await this.redisService.del(CacheKeys.users.byId(email));

      return user;
    });
  }
}
