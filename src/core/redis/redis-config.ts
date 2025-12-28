import { CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { EnvSchema } from 'src/config/env.schema';

import KeyvRedis from '@keyv/redis';

export const getRedisConfig = (
  configService: ConfigService<EnvSchema>,
): CacheModuleOptions => ({
  isGlobal: true,
  stores: [
    new KeyvRedis(
      `redis://${configService.getOrThrow('REDIS_HOST')}:${configService.getOrThrow('REDIS_PORT')}`,
    ),
  ],
});
