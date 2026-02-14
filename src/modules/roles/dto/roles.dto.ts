import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RolesDto {
  @ApiProperty({
    example: 'admin',
    minLength: 3,
    description: 'Role name',
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiPropertyOptional({
    example: 'Administrator with full access',
    minLength: 3,
    description: 'Role description',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  description?: string;
}
