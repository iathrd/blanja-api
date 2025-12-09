import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { EncryptionService } from 'src/core/encryption/encryption.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private encryptionService: EncryptionService,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const user = new Users();
    const { email, name, password, phone_number, profile_picture, role_id } =
      createUserDto;

    const hashedPassword = await this.encryptionService.hashPassword(password);

    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.phone_number = phone_number;
    user.profile_picture = profile_picture;
    user.role_id = Number(role_id);

    return user;
  }
}
