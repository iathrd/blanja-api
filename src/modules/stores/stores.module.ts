import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stores } from './entities/stores.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stores])],
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}
