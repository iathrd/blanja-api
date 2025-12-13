import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(11)
  phone_number: string;

  @IsOptional()
  @IsString()
  profile_picture: string;

  @IsString()
  role_id: string;
}
