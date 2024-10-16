import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class SendEmailDto {
  @IsNotEmpty()
  @IsString()
  to: string;

  @IsString()
  @IsOptional()
  from: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsString()
  @IsOptional()
  html: string;
}
