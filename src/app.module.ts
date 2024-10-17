import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './modules/cats/cats.controller';
import { CatsService } from './modules/cats/cats.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { ShippingAdressModule } from './modules/shipping-address/shipping-adress.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, ShippingAdressModule],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {}
