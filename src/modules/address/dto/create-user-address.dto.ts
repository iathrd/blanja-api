import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsPostalCode,
  IsBoolean,
  MinLength,
} from 'class-validator';

export class CreateUserAddressDto {
  @IsString()
  user_id: string;

  @IsString()
  @MinLength(5)
  recipient_name: string;

  @IsString()
  @MinLength(5)
  as: string;

  @IsBoolean()
  is_default: boolean;

  @IsPhoneNumber('ID')
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  sub_district: string;

  @IsPostalCode('ID')
  postal_code: string;
}
