import { ApiProperty } from '@nestjs/swagger';
import { User as UserPrisma } from '@prisma/client';

export class User implements UserPrisma {
  @ApiProperty({ description: 'Unique identifier of the user', format: "uuid" })
  id: string;

  @ApiProperty({ description: 'Email address of the user', format: "email" })
  email: string;

  @ApiProperty({ description: "User's first name" })
  name: string;

  @ApiProperty({ description: "User's password" })
  password: string;

  @ApiProperty({ description: 'Status of user verification' })
  isVerified: boolean;

  @ApiProperty({ description: 'Indicates if the user has completed the quiz' })
  hasQuizCompleted: boolean;

  @ApiProperty({ description: 'Google Id', format: "uuid" })
  googleUserId: string;

  @ApiProperty({ description: 'Apple Id', format: "uuid" })
  appleUserId: string;
}
