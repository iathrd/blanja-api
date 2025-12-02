import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthController } from './modules/auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { EnvSchema, envSchema } from './config/env.schema';
import { DatabaseModule } from './core/database/database.module';

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
  ],
  controllers: [AuthController],
  providers: [AppService],
})
export class AppModule {}
