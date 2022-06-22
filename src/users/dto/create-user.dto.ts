import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'firstName is required' })
  @IsString()
  @MinLength(2, { message: 'firstName is too short. Minimum length is 2.' })
  firstName: string;

  @IsNotEmpty({ message: 'lastName is required' })
  @IsString()
  @MinLength(2, { message: 'lastName is too short. Minimum length is 2.' })
  lastName: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString()
  password: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty({ message: 'email address is required' })
  email: string;
}
