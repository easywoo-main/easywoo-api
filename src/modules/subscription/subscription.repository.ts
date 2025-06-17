import { Injectable } from '@nestjs/common';
import { Repository } from '../../database/repository.service';
import { Prisma } from '.prisma/client';
//todo: subscription feature not yet implemented
@Injectable()
export class SubscriptionRepository {

  private readonly subscriptionRepository: Prisma.SubscriptionDelegate;
  constructor(repository: Repository) {
    this.subscriptionRepository = repository.subscription
  }

  async getSubscriptionById(id: string) {
    return this.subscriptionRepository.findUnique({
      where: { id },
    });
  }
  async getSubscriptions() {
    return this.subscriptionRepository.findMany();
  }
  async createSubscription(data: any) {
    return this.subscriptionRepository.create({
      data,
    });
  }
  async updateSubscription(id: string, data: any) {
    return this.subscriptionRepository.update({
      where: { id },
      data,
    });
  }
  async deleteSubscription(id: string) {
    return this.subscriptionRepository.delete({
      where: { id },
    });
  }
  async getSubscriptionByUserId(userId: string) {
    return this.subscriptionRepository.findMany({
      where: { userId },
    });
  }


}