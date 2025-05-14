import { ApiProperty } from '@nestjs/swagger';

export interface RefreshToken {
  refreshToken: string;
}


export class RefreshTokenImpl implements RefreshToken {
  @ApiProperty({
    description: 'The refresh token',
    type: String,
  })
  refreshToken: string;
}
