import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './modules/cats/cats.controller';
import { CatsService } from './modules/cats/cats.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { ShippingAdressModule } from './modules/shipping-address/shipping-adress.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
          },
        }),
        ttl: 60, // Default TTL in seconds (override per method if needed)
      }),
    }),
    AuthModule,
    ShippingAdressModule,
  ],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {}
