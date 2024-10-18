import { IsOptional } from 'class-validator';

export default class UpdateUserDto {
  @IsOptional()
  image: string;

  @IsOptional()
  phoneNumber: string;
}
