import { Body, Controller, Post } from '@nestjs/common';
import CreateUserDto from './dto/craete-user.dto';

@Controller('auth')
export class AuthController {
  @Post('signup')
  async signin(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return createUserDto;
  }
}
