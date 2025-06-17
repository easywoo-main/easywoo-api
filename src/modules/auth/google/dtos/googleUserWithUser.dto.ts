import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { GoogleUser } from '../google.entity';

export class GoogleUserWithUser extends GoogleUser {
  @ApiProperty({ description: 'User entity' })
  user: User;
}
