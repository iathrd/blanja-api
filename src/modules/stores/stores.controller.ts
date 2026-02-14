import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

import { StoresService } from './stores.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decoratos/roles.decorator';
import { GetUser } from 'src/common/decoratos/get-user.decorator';
import type { SafeUser } from 'src/common/types/auth.type';
import { CreateStoreDto } from './dto/create-store-dto';

@ApiTags('Stores')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin', 'admin')
@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get stores owned by current user' })
  @ApiResponse({ status: 200, description: 'List of user stores' })
  getMyStores(@GetUser() user: SafeUser) {
    return this.storesService.getMyStores(user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stores (admin/superadmin)' })
  @ApiResponse({ status: 200, description: 'List of all stores' })
  getAllStores() {
    return this.storesService.getAllStores();
  }

  @Post()
  @ApiOperation({ summary: 'Create new store' })
  @ApiResponse({ status: 201, description: 'Store created successfully' })
  createStore(
    @Body() createStoreDto: CreateStoreDto,
    @GetUser() user: SafeUser,
  ) {
    return this.storesService.createStore(user.id, createStoreDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get store by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Store found' })
  @ApiResponse({ status: 404, description: 'Store not found' })
  getStoreById(@Param('id') id: string, @GetUser() user: SafeUser) {
    return this.storesService.getStoreById(id, user.id);
  }
}
