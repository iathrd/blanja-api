import {
  IsEmail,
  IsString,
  MinLength,
  IsArray,
  ArrayNotEmpty,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(11)
  phone_number: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  profile_picture: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  role_ids: number[];
}
