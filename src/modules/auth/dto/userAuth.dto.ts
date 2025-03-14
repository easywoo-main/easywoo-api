import { User } from '../../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Tokens } from '../../token/dtos/tokens.dto';

export class UserAuthDto extends Tokens {
  @ApiProperty({ type: () => User })
  user: User;
}
