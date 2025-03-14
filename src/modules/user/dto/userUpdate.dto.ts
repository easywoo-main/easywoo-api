import { UserCreateDto } from './userCreate.dto';
import { IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UserUpdateDto extends PartialType(UserCreateDto) {
  @ApiProperty({
    description: 'The confirmation password for the user update',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  confirmPassword?: string;

  @ApiProperty({
    description: "The URL of the user's photo",
    required: false,
    type: String,
  })
  @IsUrl()
  @IsOptional()
  photo?: string;
}
