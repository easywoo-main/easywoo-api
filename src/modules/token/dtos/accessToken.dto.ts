import { ApiProperty } from '@nestjs/swagger';
import { RefreshToken } from './refresh.token.dto';

export interface AccessToken {
  accessToken: string;
}


export class AccessTokenImpl implements AccessToken {
  @ApiProperty({
    description: 'The access token',
    type: String,
  })
  accessToken: string;
}
