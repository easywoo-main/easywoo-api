import { $Enums, Subscription } from '@prisma/client';

export class SubscriptionEntity implements Subscription {
    id: string;
    userId: string;
    chatId: string;
    plan: string;
    status: $Enums.SubscriptionStatus;
    revolutOrderId: string | null;
    paymentPlatform: $Enums.PaymentPlatform;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}