import { PasswordReset } from '@prisma/client';

export class PasswordResetEntity implements PasswordReset {
    id: string;
    code: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}