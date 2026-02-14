import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsPostalCode,
  IsBoolean,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserAddressDto {
  @ApiProperty({
    example: 'Iqbal Ahmad',
    minLength: 5,
  })
  @IsString()
  @MinLength(5)
  recipient_name: string;

  @ApiProperty({
    example: 'Home', // could be Home / Office
    minLength: 4,
    description: 'Label for address (e.g., Home, Office)',
  })
  @IsString()
  @MinLength(4)
  as: string;

  @ApiProperty({
    example: true,
    description: 'Whether this is the default address',
  })
  @IsBoolean()
  is_default: boolean;

  @ApiProperty({
    example: '+6281234567890',
    description: 'Indonesian phone number',
  })
  @IsPhoneNumber('ID')
  phone_number: string;

  @ApiProperty({
    example: 'Jl. Sudirman No. 123',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 'DKI Jakarta',
  })
  @IsString()
  @IsNotEmpty()
  province: string;

  @ApiProperty({
    example: 'Jakarta Selatan',
  })
  @IsString()
  @IsNotEmpty()
  district: string;

  @ApiProperty({
    example: 'Kebayoran Baru',
  })
  @IsString()
  @IsNotEmpty()
  sub_district: string;

  @ApiProperty({
    example: '12190',
    description: 'Indonesian postal code',
  })
  @IsPostalCode('ID')
  postal_code: string;
}
