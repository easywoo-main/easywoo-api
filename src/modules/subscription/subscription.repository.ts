import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class SubscriptionRepository {

  constructor(private readonly prisma: PrismaService) {}

  async getSubscriptionById(id: string) {
    return this.prisma.subscription.findUnique({
      where: { id },
    });
  }
  async getSubscriptions() {
    return this.prisma.subscription.findMany();
  }
  async createSubscription(data: any) {
    return this.prisma.subscription.create({
      data,
    });
  }
  async updateSubscription(id: string, data: any) {
    return this.prisma.subscription.update({
      where: { id },
      data,
    });
  }
  async deleteSubscription(id: string) {
    return this.prisma.subscription.delete({
      where: { id },
    });
  }
  async getSubscriptionByUserId(userId: string) {
    return this.prisma.subscription.findMany({
      where: { userId },
    });
  }


}