import { ApiProperty } from '@nestjs/swagger';

export class GoogleCreateDto {
  @ApiProperty({
    description: 'The googleId of the user',
  })
  googleAccountId: string;

  @ApiProperty({
    description: 'The email address of the user',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'The first name of the user',
  })
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
  })
  lastName: string;

  @ApiProperty({
    description: 'The photo of the user',
  })
  picture: string;

  @ApiProperty({
    description: 'The email verification status of the user',
  })
  emailVerified: boolean;
}
