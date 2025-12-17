import {
  IsBoolean,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserAddressDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  recipient_name?: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  as?: string;

  @IsOptional()
  @IsBoolean()
  is_default?: boolean;

  @IsOptional()
  @IsPhoneNumber('ID')
  phone_number?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  province?: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsString()
  sub_district?: string;

  @IsOptional()
  @IsPostalCode('ID')
  postal_code?: string;
}
