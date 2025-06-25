import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionWebhookGuard } from '../../guard';
import { AuthGuard } from '../../guard';
import { SubscriptionDto } from './dto/subscription.dto';
import { Success } from '../../utils/success.utils';
import { UserPayload } from '../token/payloads/userPayload.interface';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('webhook/create')
  @UseGuards(SubscriptionWebhookGuard)
  async create(@Body() subscription: SubscriptionDto) {
    await this.subscriptionService.create(subscription.event);
    return new Success("Subscription created successfully");
  }

  @Post('webhook/cancel')
  @UseGuards(SubscriptionWebhookGuard)
  async cancelSubscription(@Body() subscription: SubscriptionDto) {
    await this.subscriptionService.cancelSubscription(subscription.event.app_user_id);
    return new Success("Subscription cancelled successfully");
  }

  @Post('webhook/payment-issue')
  async paymentIssue(@Body() subscription: SubscriptionDto) {
    await this.subscriptionService.paymentIssue(subscription.event.app_user_id);
    return new Success("Payment issue created successfully");
  }

  @Get('my')
  @UseGuards(AuthGuard)
  async getSubscription(@Body() user: UserPayload) {
    return this.subscriptionService.getSubscriptionByUserId(user.id);
  }
}
