import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { EnvSchema, envSchema } from './config/env.schema';
import { DatabaseModule } from './core/database/database.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AddressModule } from './modules/address/address.module';
import { StoresModule } from './modules/stores/stores.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot<EnvSchema>({
      isGlobal: true,
      validate: (env) => {
        const parsed = envSchema.safeParse(env);

        if (!parsed.success) {
          throw new Error('Invalid environment variables');
        }

        return parsed.data;
      },
    }),
    RolesModule,
    AuthModule,
    UsersModule,
    AddressModule,
    StoresModule,
  ],
})
export class AppModule {}
