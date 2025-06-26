import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SubscriptionRepository } from './subscription.repository';
import { CreateSubscriptionDto } from './dtos/createSubscription.dto';
import { SubscriptionEntity } from './subscription.entity';
import { ChatService } from '../chat/chat.service';
import { SubscriptionStatus } from '@prisma/client';
import { CheckExists } from '../../decorators';

@Injectable()
export class SubscriptionService {
  constructor(private readonly subscriptionRepository: SubscriptionRepository,
              private readonly userService: UserService,
              private readonly chatService: ChatService) {
  }

  public async createSubscription(subscription: CreateSubscriptionDto): Promise<SubscriptionEntity> {
    await Promise.all([
      this.userService.findUserById(subscription.userId),
      this.chatService.findChatById(subscription.chatId)
    ])
    return this.subscriptionRepository.createSubscription(subscription);
  }

  public async cancelSubscription(userId: string, chatId: string): Promise<SubscriptionEntity>  {
    return this.subscriptionRepository.updateSubscription(userId, chatId, { status: SubscriptionStatus.CANCELLED });
  }

  public async paymentIssue(userId: string, chatId: string): Promise<SubscriptionEntity>  {
    return this.subscriptionRepository.updateSubscription(userId, chatId, { status: SubscriptionStatus.INACTIVE });
  }

  @CheckExists("Subscription not found")
  public async getSubscriptionByChatIdAndUserId(chatId: string, userId: string): Promise<SubscriptionEntity> {
    return this.subscriptionRepository.getSubscriptionByChatIdAndUserId(chatId, userId)
  }

  public async getSubscriptionById(subscriptionId: string): Promise<SubscriptionEntity> {
    return this.subscriptionRepository.getSubscriptionById(subscriptionId);
  }

}
