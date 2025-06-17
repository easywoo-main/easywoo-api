import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GoogleRedirectDto {
  @ApiProperty({
    description: 'The redirect uri to redirect the user to after the Google login.',
  })
  @IsString()
  @IsNotEmpty()
  redirectUri: string;
}
