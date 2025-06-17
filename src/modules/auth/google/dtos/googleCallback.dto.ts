import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class GoogleCallbackDto {
  @ApiProperty({
    description: 'The authorization code returned from Google.',
  })
  @IsString()
  @IsNotEmpty()
  idToken: string;
}
