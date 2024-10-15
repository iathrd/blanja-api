import { IsOptional } from 'class-validator';

export default class UpdateUserDto {
  @IsOptional()
  file: Express.Multer.File;

  @IsOptional()
  phoneNumber: string;
}
