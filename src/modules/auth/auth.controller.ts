import { Body, Controller, Post } from '@nestjs/common';
import CreateUserDto from './dto/craete-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.signup(createUserDto);
  }

  @Post('signin')
  async signin(@Body() createUserDto: CreateUserDto) {
    return this.authService.signin(createUserDto);
  }
}
