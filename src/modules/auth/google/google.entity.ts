import { GoogleUser as GoogleUserPrisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class GoogleUser implements GoogleUserPrisma {
  @ApiProperty({
    description: 'Unique identifier of the Google user',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Google account identifier',
    example: 'google-account-id',
  })
  googleAccountId: string;

  @ApiProperty({
    description: 'Profile picture of the Google user',
    example: 'https://example.com/picture.jpg',
  })
  picture: string;

  @ApiProperty({
    description: 'Email address of the Google user',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    description: "User's first name",
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: "User's last name",
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    description: 'Indicates whether the email is verified',
    example: true,
  })
  emailVerified: boolean;

  @ApiProperty({
    description: 'Timestamp when the Google user was created',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the Google user was last updated',
  })
  updatedAt: Date;
}
