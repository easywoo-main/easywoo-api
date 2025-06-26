import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({ example: 'adminUser', description: 'Admin username' })
  userName: string;

  @ApiProperty({ example: 'StrongPassword123!', description: 'Admin password' })
  password: string;

  @ApiProperty({ example: 'role-uuid', description: 'Role identifier' })
  roleId: string;
}