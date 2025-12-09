import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { EnvSchema } from 'src/config/env.schema';

export const getJwtConfig = (
  configService: ConfigService<EnvSchema>,
): JwtModuleOptions => ({
  secret: configService.get<string>('JWT_SECRET'),
  secretOrPrivateKey: configService.get<string>('JWT_SECRET'),
});
