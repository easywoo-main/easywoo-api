import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({
    description: 'The first name of the user',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    type: String,
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    type: String,
  })
  @IsString()
  password: string;
}
