import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({
    description: 'The first name of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    format: 'email',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
  })
  @IsString()
  @IsOptional()
  password?: string;
}
