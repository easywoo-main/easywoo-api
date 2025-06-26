import { ApiProperty } from '@nestjs/swagger';

export class ResetPassword {
  @ApiProperty({
    description: 'New password for the user',
    example: 'StrongP@ssw0rd!',
    minLength: 6,
  })
  password: string;
}