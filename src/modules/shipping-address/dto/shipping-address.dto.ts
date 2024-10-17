import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class ShippingAddressDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  saveAs: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  receiverName: string;

  @IsNotEmpty()
  @IsString()
  receiverPhoneNumber: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(5)
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsOptional()
  @IsBoolean()
  primaryAddress: boolean;

  @IsOptional()
  @IsString()
  userId: string;
}
