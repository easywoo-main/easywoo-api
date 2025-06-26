import { Injectable } from '@nestjs/common';
import { Repository } from '../../database/repository.service';
import { Prisma } from '.prisma/client';
import { CreateSubscriptionDto } from './dtos/createSubscription.dto';
import { SubscriptionEntity } from './subscription.entity';
import { UpdateSubscriptionDto } from './dtos/updateSubscription.dto';
//todo: subscription feature not yet implemented
@Injectable()
export class SubscriptionRepository {

  private readonly subscriptionRepository: Prisma.SubscriptionDelegate;
  constructor(repository: Repository) {
    this.subscriptionRepository = repository.subscription
  }

  async getSubscriptionById(id: string): Promise<SubscriptionEntity> {
    return this.subscriptionRepository.findUnique({
      where: { id },
    });
  }

  async getSubscriptionByChatIdAndUserId(chatId: string, userId: string): Promise<SubscriptionEntity> {
    return this.subscriptionRepository.findUnique({where: {userId_chatId:{chatId, userId}}})
  }
  async createSubscription(data: CreateSubscriptionDto): Promise<SubscriptionEntity> {
    return this.subscriptionRepository.create({
      data,
    });
  }
  async updateSubscription(userId: string, chatId: string, data: UpdateSubscriptionDto): Promise<SubscriptionEntity> {
    return this.subscriptionRepository.update({
      where: { userId_chatId:{userId, chatId}  },
      data,
    });
  }
}