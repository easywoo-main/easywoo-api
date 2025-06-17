import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty({ description: 'Unique identifier of the user', format: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Email address of the user', format: 'email' })
  email: string;

  @ApiProperty({ description: "User's first name" })
  name: string;

  @ApiProperty({ description: "User's avatar" })
  photo: string

  @ApiProperty({ description: "User's password" })
  password: string;

  @ApiProperty({ description: 'Status of user verification' })
  isVerified: boolean;

  @ApiProperty({ description: 'Indicates if the user has completed the quiz' })
  hasQuizCompleted: boolean;

  @ApiProperty({ description: 'Google Id', format: 'uuid', required: false })
  googleUserId: string;

  @ApiProperty({ description: 'Apple Id', format: 'uuid', required: false  })
  appleUserId: string;
}
