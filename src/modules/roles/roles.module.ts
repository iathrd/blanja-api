import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { UserRoles } from './entities/user-roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Roles, UserRoles])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
