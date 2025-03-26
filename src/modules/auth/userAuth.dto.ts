import { ApiProperty } from '@nestjs/swagger';
import { Tokens } from '../token/dtos/tokens.dto';
import { UserEntity } from '../user/user.entity';

export class UserAuthDto extends Tokens {
  @ApiProperty({ type: () => UserEntity })
  user: UserEntity;
}
