import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateUserStoreDto } from '../users/dto/create-user-store';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto.refresh_token);
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('profile_picture'))
  signUp(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.authService.signUp(createUserDto, file);
  }

  @Post('register-store')
  registerUserStore(@Body() createUserStoreDto: CreateUserStoreDto) {
    return this.authService.registerUserStore(createUserStoreDto);
  }
}
