import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvSchema } from 'src/config/env.schema';

export const getTypeOrmConfig = (
  configService: ConfigService<EnvSchema>,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.getOrThrow('DB_HOST'),
  port: configService.getOrThrow('DB_PORT'),
  username: configService.getOrThrow('DB_USER'),
  password: configService.getOrThrow('DB_PASSWORD'),
  database: configService.getOrThrow('DB_NAME'),
  autoLoadEntities: true,
  synchronize: configService.getOrThrow('NODE_ENV') !== 'production',
  logging: configService.getOrThrow('NODE_ENV') !== 'production',
});
