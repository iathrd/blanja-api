import {
  IsPhoneNumber,
  IsString,
  MinLength,
  IsNotEmpty,
  IsPostalCode,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreDto {
  @ApiProperty({
    example: 'Iqbal Mart',
    minLength: 5,
  })
  @IsString()
  @MinLength(5)
  name: string;

  @ApiProperty({
    example: '+6281234567890',
    description: 'Indonesian phone number',
  })
  @IsPhoneNumber('ID')
  phone_number: string;

  @ApiProperty({
    example: 'Jl. Sudirman No. 99',
    minLength: 5,
  })
  @IsString()
  @MinLength(5)
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
