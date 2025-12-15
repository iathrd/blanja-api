import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsPostalCode,
} from 'class-validator';

export class CreateAddressDto {
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
