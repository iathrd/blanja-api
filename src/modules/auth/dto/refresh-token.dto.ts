import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOi',
    description: 'The refresh token to be refreshed',
  })
  @IsString()
  refresh_token: string;
}
