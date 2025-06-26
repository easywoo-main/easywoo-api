import { Admin } from '@prisma/client';

import { ApiProperty } from '@nestjs/swagger';

export class AdminEntity implements Admin {
    @ApiProperty({ description: 'Unique identifier for the admin',format: 'uuid' })
    id: string;

    @ApiProperty({ description: 'Username of the admin' })
    userName: string;

    @ApiProperty({ description: 'Hashed password of the admin' })
    password: string;

    @ApiProperty({ description: 'Role ID associated with the admin', format: 'uuid' })
    roleId: string;

    @ApiProperty({ description: 'Date when the admin was created' })
    createdAt: Date;

    @ApiProperty({ description: 'Date when the admin was last updated' })
    updatedAt: Date;
}