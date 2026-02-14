import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    example: 'iqbal17@gmail.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'iqbal123',
    description: 'User password (min 8 characters)',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;
}
