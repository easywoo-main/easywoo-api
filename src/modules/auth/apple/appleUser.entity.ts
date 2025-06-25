import { AppleUser } from '@prisma/client';

export class AppleUserEntity implements AppleUser {
    id: string;
    appleId: string;
    email: string;
    firstName: string;
    lastName: string;
    middleName: string | null;
    photo: string;
    emailVerified: boolean;
    userId: string;
    createdAt: Date;
    updatedAt: Date;

}