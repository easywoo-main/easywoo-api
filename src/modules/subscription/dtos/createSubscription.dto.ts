import { $Enums } from '@prisma/client';

export class CreateSubscriptionDto {
  userId: string;
  chatId: string;
  plan: string;
  status: $Enums.SubscriptionStatus;
  paymentPlatform: $Enums.PaymentPlatform;
  startDate: Date;
  endDate: Date;
}