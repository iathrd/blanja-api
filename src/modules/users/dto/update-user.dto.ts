import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

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

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  role_ids: number[];
}
