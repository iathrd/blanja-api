import {
  IsEmail,
  IsString,
  MinLength,
  IsArray,
  ArrayNotEmpty,
  IsInt,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Iqbal Ahmad',
    minLength: 5,
  })
  @IsString()
  @MinLength(5)
  name: string;

  @ApiProperty({
    example: 'iqbal@email.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '081234567890',
    minLength: 11,
  })
  @IsString()
  @MinLength(11)
  phone_number: string;

  @ApiProperty({
    example: 'password123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Profile picture file',
  })
  @IsOptional()
  profile_picture?: any;

  @ApiProperty({
    example: [1, 2],
    type: [Number],
    description: 'Array of role IDs',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  role_ids: number[];
}
