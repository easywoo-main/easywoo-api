import { ApiProperty } from '@nestjs/swagger';

export class AdminLoginDto {
  @ApiProperty({ example: 'admin', description: 'Admin user name' })
  userName: string;

  @ApiProperty({ example: 'password123', description: 'Admin password' })
  password: string;
}