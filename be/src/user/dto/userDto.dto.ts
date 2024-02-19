import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserDto {
  @Expose()
  id: number;
  @Expose()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 20)
  password: string;

  address: string;
  name: string;
  age: number;
  @Expose()
  role: string;
}
