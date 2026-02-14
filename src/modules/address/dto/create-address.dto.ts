import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsPostalCode,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
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
