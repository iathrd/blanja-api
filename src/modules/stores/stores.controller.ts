import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { StoresService } from './stores.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decoratos/roles.decorator';
import { GetUser } from 'src/common/decoratos/get-user.decorator';
import { Users } from '../users/entities/user.entity';
import type { SafeUser } from 'src/common/types/auth.type';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin', 'admin')
@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @Get('/me')
  getMyStores(@GetUser() user: SafeUser) {
    return this.storesService.getMyStores(user);
  }

  @Get('/')
  getAllStores() {
    return this.storesService.getAllStores();
  }

  @Get(':id')
  getStoreById(@Param('id') id: string, @GetUser() user: Users) {
    return this.storesService.getStoreById(id, user.id);
  }
}
