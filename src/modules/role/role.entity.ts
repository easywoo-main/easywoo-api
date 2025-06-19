import { Role } from '@prisma/client';

export class RoleEntity implements Role {
    name: string;
    id: string;
    isEditChat: boolean;
    isEditAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;

}