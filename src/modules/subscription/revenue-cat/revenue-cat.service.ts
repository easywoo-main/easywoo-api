import { BadRequestException, Injectable } from '@nestjs/common';
import { SubscriptionDto, SubscriptionEvent } from './dtos/subscription.dto';
import { CANCEL_SUBSCRIPTION_TYPES, CREATE_SUBSCRIPTION_TYPES, PAYMENT_ISSUE_TYPES } from './subscriptionType.utils';
import { PaymentPlatform, SubscriptionStatus } from '@prisma/client';
import { SubscriptionService } from '../subscription.service';
import { SubscriptionEntity } from '../subscription.entity';

@Injectable()
export class RevenueCatService {
  constructor(private readonly subscriptionService: SubscriptionService) {
  }

  public async handleWebhook(subscriptionDto: SubscriptionDto): Promise<SubscriptionEntity> {
    const subscriptionEvent = subscriptionDto.event;

    const type = subscriptionEvent.type

    if (CREATE_SUBSCRIPTION_TYPES.includes(type)) {
      return this.create(subscriptionEvent);
    } else if (CANCEL_SUBSCRIPTION_TYPES.includes(type)) {
      return this.cancelSubscription(subscriptionEvent);
    } else if (PAYMENT_ISSUE_TYPES.includes(type)) {
      return this.paymentIssue(subscriptionEvent);
    }
    throw new BadRequestException('Invalid subscription type');
  }

  public async create(subscription: SubscriptionEvent) {
    const { app_user_id: userId, product_id: plan, expiration_at_ms: expiration_date, price } = subscription;
    const chatId = "1"  //todo

    return this.subscriptionService.createSubscription({
      userId,
      chatId,
      plan,
      startDate: new Date(),
      endDate: new Date(expiration_date),
      paymentPlatform: PaymentPlatform.REVENUE_CAT,
      status: SubscriptionStatus.ACTIVE,
    });
  }

  public async cancelSubscription(subscriptionEvent: SubscriptionEvent) {
    const { app_user_id: userId } = subscriptionEvent;
    const chatId = "1"  //todo
    return this.subscriptionService.cancelSubscription(userId, chatId);
  }

  public async paymentIssue(subscriptionEvent: SubscriptionEvent) {
    const { app_user_id: userId } = subscriptionEvent;
    const chatId = "1"  //todo
    return this.subscriptionService.paymentIssue(userId, chatId)
  }
}
