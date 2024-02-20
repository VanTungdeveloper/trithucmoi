import { Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';

export class UserDto {
  id?: number;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 20)
  password: string;
}
