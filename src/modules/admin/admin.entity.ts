import { Admin } from '@prisma/client';

export class AdminEntity implements Admin {
    id: string;
    userName: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}