import { ApiProperty } from '@nestjs/swagger';
import { Tokens } from '../token/dtos/tokens.dto';
import { UserEntity } from '../user/user.entity';

export class UserAuthDto implements Tokens {
  @ApiProperty({
    description: 'The access token',
    type: String,
  })
  accessToken: string;

  @ApiProperty({
    description: 'The refresh token',
    type: String,
  })
  refreshToken: string;

  @ApiProperty({ type: () => UserEntity })
  user: UserEntity;
}
