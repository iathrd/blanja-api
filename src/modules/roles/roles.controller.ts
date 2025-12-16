import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RolesDto } from './dto/roles.dto';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decoratos/roles.decorator';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin')
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
