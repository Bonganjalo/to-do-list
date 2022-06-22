import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateTaskDto {
  @IsNotEmpty({ message: 'title is required' })
  @IsString()
  @MinLength(2, { message: 'title is too short. Minimum length is 2.' })
  title: string;

  @IsNotEmpty({ message: 'description is required' })
  @IsString()
  @MinLength(2, { message: 'description is too short. Minimum length is 2.' })
  description: string;

  @IsNotEmpty({ message: 'userId is required' })
  @IsString()
  userId: string;
}
