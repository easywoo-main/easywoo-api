import { ApiProperty } from '@nestjs/swagger';
import { User as UserPrisma } from '@prisma/client';

export class User implements UserPrisma {
  @ApiProperty({ description: 'Unique identifier of the user' })
  id: string;

  @ApiProperty({ description: 'Email address of the user' })
  email: string;

  @ApiProperty({ description: "User's first name" })
  firstName: string;

  @ApiProperty({ description: "User's last name" })
  lastName: string;

  @ApiProperty({ description: "User's password" })
  password: string;

  @ApiProperty({ description: 'Profile picture of the user' })
  picture: string;

  @ApiProperty({ description: 'Status of user verification' })
  isVerified: boolean;

  @ApiProperty({ description: 'Timestamp when the user was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the user was last updated' })
  updatedAt: Date;
}
