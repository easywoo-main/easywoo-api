import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SubscriptionWebhookGuard } from '../../../guard';
import { SubscriptionDto, SubscriptionEvent } from './dtos/subscription.dto';
import { RevenueCatService } from './revenue-cat.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SubscriptionEntity } from '../subscription.entity';

@Controller('revenue-cat')
export class RevenueCatController {
  constructor(private readonly revenueCatService: RevenueCatService) {}

  @UseGuards(SubscriptionWebhookGuard)
  @ApiBearerAuth()
  @Post("webhook")
  public async handleWebhook(@Body() subscriptionDto: SubscriptionDto): Promise<SubscriptionEntity> {
    return await this.revenueCatService.handleWebhook(subscriptionDto)
  }
}
