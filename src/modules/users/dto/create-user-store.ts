import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class CreateUserStoreDto extends CreateUserDto {
  @ApiProperty({
    example: 'Iqbal Mart',
    minLength: 5,
  })
  @IsString()
  @MinLength(5)
  store_name: string;

  @ApiProperty({
    example: 'Jl. Sudirman No. 99',
    minLength: 5,
  })
  @IsString()
  @MinLength(5)
  address: string;

  @ApiProperty({
    example: '12190',
    minLength: 4,
  })
  @IsString()
  @MinLength(4)
  postal_code: string;

  @ApiProperty({
    example: 'DKI Jakarta',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  province: string;

  @ApiProperty({
    example: 'Jakarta Selatan',
    minLength: 4,
  })
  @IsString()
  @MinLength(4)
  district: string;

  @ApiProperty({
    example: 'Kebayoran Baru',
    minLength: 4,
  })
  @IsString()
  @MinLength(4)
  sub_district: string;
}
