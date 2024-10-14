import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import CreateUserDto from './dto/craete-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { User } from 'src/common/decorators/user.decorator';

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

  @UseGuards(AuthGuard)
  @Post('user-details')
  async userDetails(@User() user: any) {
    return user;
  }
}
