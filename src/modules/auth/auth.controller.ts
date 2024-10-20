import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import CreateUserDto from './dto/craete-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import IUser from './interfaces/user.interface';
import UpdateUserDto from './dto/update-user.dto';
import SendEmailDto from 'src/common/dto/send-emai.dto';

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
  @UseInterceptors(FileInterceptor('file'))
  @Put('user-details')
  async updateUserDetail(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 1 * 1000 * 1024 }) // 1MB
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @User() user: IUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUserDetail(user, file, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('user-details')
  async getUserDetails(@User() user: IUser) {
    return this.authService.getUserDetails(user);
  }

  @Post('send-email')
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.authService.sendEmail(sendEmailDto);
  }
}
