import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/* eslint-disable prettier/prettier */
export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
