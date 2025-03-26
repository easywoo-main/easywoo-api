import { UserCreateDto } from './userCreate.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto extends UserCreateDto {
  @ApiProperty({ description: 'The confirmation password for the user update', required: false })
  @IsOptional()
  @IsString()
  confirmPassword?: string;
}
