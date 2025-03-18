import { ApiProperty } from '@nestjs/swagger';
import { User as UserPrisma } from '@prisma/client';

export class User implements UserPrisma {
  @ApiProperty({ description: 'Unique identifier of the user' })
  id: string;

  @ApiProperty({ description: 'Email address of the user' })
  email: string;

  @ApiProperty({ description: "User's first name" })
  name: string;

  @ApiProperty({ description: "User's password" })
  password: string;

  @ApiProperty({ description: 'Profile picture of the user' })
  picture: string;

  @ApiProperty({ description: 'Status of user verification' })
  isVerified: boolean;

  @ApiProperty({ description: 'Indicates if the user has completed the quiz' })
  hasQuizCompleted: boolean;

  @ApiProperty({ description: 'Google Id' })
  googleUserId: string;

  @ApiProperty({ description: 'Apple Id' })
  appleUserId: string;

  @ApiProperty({ description: 'Timestamp when the user was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the user was last updated' })
  updatedAt: Date;
}
