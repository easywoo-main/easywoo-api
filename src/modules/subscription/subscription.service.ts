import { Injectable } from '@nestjs/common';
import { SubscriptionStatus } from '@prisma/client';
import { UserService } from '../user/user.service';
import { SubscriptionEvent } from './dto/subscription.dto';
import { SubscriptionRepository } from './subscription.repository';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly userService: UserService,
  ) {}

  public async create(subscription: SubscriptionEvent) {
    const { app_user_id: userId, product_id: plan, expiration_at_ms: expiration_date, price } = subscription;
    const user = await this.userService.findUserById(userId);
    // await this.subscriptionRepository.createSubscription(user.id, plan, expiration_date); // todo
  }

  public async getSubscriptionByUserId(userId: string) {
    return this.subscriptionRepository.getSubscriptionByUserId(userId);
  }

  public async cancelSubscription(userId: string) {
    await this.userService.findUserById(userId);
    return this.subscriptionRepository.updateSubscription(userId, SubscriptionStatus.CANCELLED);
  }

  public async paymentIssue(userId: string) {
    const user = await this.userService.findUserByEmail(userId);
  }
}
