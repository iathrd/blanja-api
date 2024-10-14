import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export default class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @Length(6, 20)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
