import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getRoles() {
    const query = this.rolesRepository.createQueryBuilder('roles');

    return await query.getMany();
  }

  async getRole(id: number) {
    const found = await this.rolesRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return found;
  }

  async createRole(createRoleDto: RolesDto) {
    const role = new Roles();
    role.description = createRoleDto.description;
    role.name = createRoleDto.name;

    await this.rolesRepository.save(role);

    return role;
  }

  async updateRole(id: number, updateRoleDto: RolesDto) {
    const role = await this.getRole(id);

    role.description = updateRoleDto.description;
    role.name = updateRoleDto.name;

    await this.rolesRepository.save(role);

    return role;
  }

  async deleteRole(id: number) {
    const result = await this.rolesRepository.delete(id);

    if (result.affected == 0) {
      throw new NotFoundException(`This with id ${id} not found`);
    }
  }
}
