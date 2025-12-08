import { Injectable } from '@nestjs/common';
import { RolesDto } from './dto/roles.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
  ) {}

  async createRole(createRoleDto: RolesDto) {
    const query = this.rolesRepository;

    const role = new Roles();
    role.description = createRoleDto.description;
    role.name = createRoleDto.name;

    await query.save(role);

    return role;
  }
}
