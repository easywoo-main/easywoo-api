import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { SubscriptionRepository } from './subscription.repository';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionRepository],
  imports:[UserModule, TokenModule],
})
export class SubscriptionModule {}
