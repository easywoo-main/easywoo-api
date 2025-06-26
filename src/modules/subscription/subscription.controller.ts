import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionWebhookGuard } from '../../guard';
import { AuthGuard } from '../../guard';
import { SubscriptionDto } from './revenue-cat/dtos/subscription.dto';
import { Success } from '../../utils/success.utils';
import { UserPayload } from '../token/payloads/userPayload.interface';
import { UserDetails } from '../../decorators';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('my')
  @UseGuards(AuthGuard)
  async getSubscription(@UserDetails() user: UserPayload, @Query("chatId") chatId: string) {
    return this.subscriptionService.getSubscriptionByChatIdAndUserId(chatId, user.id);
  }
}
