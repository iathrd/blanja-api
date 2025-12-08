import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { EnvSchema, envSchema } from './config/env.schema';
import { DatabaseModule } from './core/database/database.module';
import { RolesModule } from './modules/roles/roles.module';

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
  ],
})
export class AppModule {}
