import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RolesDto } from './dto/roles.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get(':id')
  getRole(@Param('id') id: number) {
    return this.rolesService.getRole(id);
  }

  @Get()
  getRoles() {
    return this.rolesService.getRoles();
  }

  @Post()
  createRole(@Body() createRolesDto: RolesDto) {
    return this.rolesService.createRole(createRolesDto);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: number) {
    return this.rolesService.deleteRole(id);
  }

  @Put(':id')
  updateRole(@Param('id') id: number, @Body() updateRolesDto: RolesDto) {
    return this.rolesService.updateRole(id, updateRolesDto);
  }
}
