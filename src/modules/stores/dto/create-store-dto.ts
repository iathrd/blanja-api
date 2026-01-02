import { IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsPhoneNumber('ID')
  phone_number: string;

  @IsString()
  @MinLength(5)
  address: string;

  @IsString()
  province: string;

  @IsString()
  city: string;

  @IsString()
  district: string;

  @IsString()
  sub_district: string;
}
