import { PasswordResetStatus } from '@prisma/client';

export class CreateResetPassword {
  userId: string;
  status: PasswordResetStatus;
}