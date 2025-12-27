import { Controller, Get } from '@nestjs/common';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @Get()
  getStores() {
    return this.storesService.getStores();
  }
}
