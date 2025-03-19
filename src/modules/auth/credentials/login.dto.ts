import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The email address of the user',
    format: 'email',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'The password for the user',
    type: String,
  })
  password: string;
}
