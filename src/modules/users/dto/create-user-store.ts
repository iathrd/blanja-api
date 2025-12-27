import { IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateUserStoreDto extends CreateUserDto {
  @IsString()
  @MinLength(5)
  store_name: string;

  @IsString()
  @MinLength(5)
  address: string;

  @IsString()
  @MinLength(4)
  postal_code: string;

  @IsString()
  @MinLength(3)
  province: string;

  @IsString()
  @MinLength(4)
  district: string;

  @IsString()
  @MinLength(4)
  sub_district: string;

  @IsString()
  @MinLength(4)
  city: string;
}
