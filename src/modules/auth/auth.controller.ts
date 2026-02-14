import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
} from '@nestjs/swagger';

import { SignInDto } from './dto/sign-in.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateUserStoreDto } from '../users/dto/create-user-store';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto.refresh_token);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register new user with profile picture' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @UseInterceptors(FileInterceptor('profile_picture'))
  signUp(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.authService.signUp(createUserDto, file);
  }

  @Post('register-store')
  @ApiOperation({ summary: 'Register new store user' })
  @ApiResponse({
    status: 201,
    description: 'Store user registered successfully',
  })
  registerUserStore(@Body() createUserStoreDto: CreateUserStoreDto) {
    return this.authService.registerUserStore(createUserStoreDto);
  }
}
