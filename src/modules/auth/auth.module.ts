import { Logger, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { SendgridModule } from '../sendgrid/sendgrid.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    PrismaModule,
    CloudinaryModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    SendgridModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, Logger],
})
export class AuthModule {}
