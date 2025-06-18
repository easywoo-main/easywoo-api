import { Tokens } from '../../../token/dtos/tokens.dto';
import { ApiProperty } from '@nestjs/swagger';
import { AdminEntity } from '../../../admin/admin.entity';

export class AdminAuthDto implements Tokens {
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


  admin: AdminEntity;
}