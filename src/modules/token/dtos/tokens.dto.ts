import { ApiProperty } from '@nestjs/swagger';

export class Tokens {
  @ApiProperty({
    description: 'The refresh token',
    type: String,
  })
  refreshToken: string;

  @ApiProperty({
    description: 'The access token',
    type: String,
  })
  accessToken: string;
}
