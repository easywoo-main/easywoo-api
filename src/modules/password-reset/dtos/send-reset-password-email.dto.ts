import { ApiProperty } from '@nestjs/swagger';

export class SendResetPasswordEmailDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  email: string;

  @ApiProperty({ description: 'URL to redirect after password reset',format: 'url' })
  redirectUrl: string;
}