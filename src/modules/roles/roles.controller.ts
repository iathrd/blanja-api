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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

import { RolesDto } from './dto/roles.dto';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decoratos/roles.decorator';

@ApiTags('Roles')
@ApiBearerAuth('access-token') // must match main.ts
@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get role by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Role found' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  getRole(@Param('id') id: string) {
    return this.rolesService.getRole(+id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, description: 'List of roles' })
  getRoles() {
    return this.rolesService.getRoles();
  }

  @Post()
  @ApiOperation({ summary: 'Create new role (superadmin only)' })
  @ApiResponse({ status: 201, description: 'Role created successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  createRole(@Body() createRolesDto: RolesDto) {
    return this.rolesService.createRole(createRolesDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete role by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Role deleted successfully' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  deleteRole(@Param('id') id: string) {
    return this.rolesService.deleteRole(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update role by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Role updated successfully' })
  updateRole(@Param('id') id: string, @Body() updateRolesDto: RolesDto) {
    return this.rolesService.updateRole(+id, updateRolesDto);
  }
}
