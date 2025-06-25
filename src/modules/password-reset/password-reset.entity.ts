import { $Enums, PasswordReset } from '@prisma/client';

export class PasswordResetEntity implements PasswordReset {
    id: string;
    userId: string;
    status: $Enums.PasswordResetStatus;
    createdAt: Date;
    updatedAt: Date;
}