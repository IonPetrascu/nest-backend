import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsString({ message: 'Custom error is not string' })
  @IsNotEmpty({ message: 'Custom error empty' })
  @Length(2, 10, { message: 'min 2 max 10' })
  name: string;

  @IsBoolean({ message: 'status need to be boolean' })
  isCompleted: boolean;
}
