import {
  IsBoolean,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserAddressDto {
  @ApiPropertyOptional({
    example: 'Iqbal Ahmad',
    minLength: 5,
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  recipient_name?: string;

  @ApiPropertyOptional({
    example: 'Home',
    minLength: 4,
    description: 'Label for address (Home, Office, etc)',
  })
  @IsOptional()
  @IsString()
  @MinLength(4)
  as?: string;

  @ApiPropertyOptional({
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  is_default?: boolean;

  @ApiPropertyOptional({
    example: '+6281234567890',
  })
  @IsOptional()
  @IsPhoneNumber('ID')
  phone_number?: string;

  @ApiPropertyOptional({
    example: 'Jl. Sudirman No. 123',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    example: 'DKI Jakarta',
  })
  @IsOptional()
  @IsString()
  province?: string;

  @ApiPropertyOptional({
    example: 'Jakarta Selatan',
  })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional({
    example: 'Kebayoran Baru',
  })
  @IsOptional()
  @IsString()
  sub_district?: string;

  @ApiPropertyOptional({
    example: '12190',
  })
  @IsOptional()
  @IsPostalCode('ID')
  postal_code?: string;
}
