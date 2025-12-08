import { IsOptional, IsString, MinLength } from 'class-validator';

export class RolesDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @MinLength(3)
  description: string;
}
