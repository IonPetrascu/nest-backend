import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
import { StartsWith } from '../decorators/starts-with-decorators';

export enum TaskTag {
  WORK = 'work',
  STUDY = 'study',
  HOME = 'home',
}
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @StartsWith('Task:') //custom decorator for validation
  @Length(2, 100)
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt({ message: 'need to be number' }) //целое число а не 4.3
  @IsPositive()
  @IsOptional({ message: 'need to be positive' })
  priority: number;

  @IsArray()
  @IsEnum(TaskTag, { message: 'string in array from enum', each: true })
  @IsOptional()
  tags: TaskTag[];

  @IsString()
  @MinLength(6, { message: 'min 6 ' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, { message: 'error' })
  @IsOptional()
  password: string;

  @IsUrl(
    {
      protocols: ['https'],
      require_protocol: false,
      require_port: true,
      host_whitelist: ['google.com'],
      host_blacklist: ['facebook.com'],
    },
    { message: 'incorect url' },
  )
  @IsOptional()
  websiteUrl: string;

  @IsUUID('4', { message: 'UUID incorect' })
  @IsOptional()
  userId: string;
}
