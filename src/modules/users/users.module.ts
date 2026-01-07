import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { EncryptionModule } from 'src/core/encryption/encryption.module';
import { RolesModule } from '../roles/roles.module';
import { BrevoModule } from 'src/core/brevo/brevo.module';
import { GcsModule } from 'src/core/gcs/gcs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    EncryptionModule,
    RolesModule,
    BrevoModule,
    GcsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
