import { CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { EnvSchema } from 'src/config/env.schema';
import * as redisStore from 'cache-manager-ioredis-yet';

export const getRedisConfig = (
  configService: ConfigService<EnvSchema>,
): CacheModuleOptions => ({
  isGlobal: true,
  store: redisStore,
  host: configService.getOrThrow('REDIS_HOST'),
  port: configService.getOrThrow('REDIS_PORT'),
  ttl: 60,
});
