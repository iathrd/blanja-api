import { Body, Controller, Post } from '@nestjs/common';
import { RolesDto } from './dto/roles.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  create(@Body() createRolesDto: RolesDto) {
    return this.rolesService.createRole(createRolesDto);
  }
}
