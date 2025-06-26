import { Module } from '@nestjs/common';
import { RevenueCatController } from './revenue-cat.controller';
import { RevenueCatService } from './revenue-cat.service';
import { SubscriptionModule } from '../subscription.module';

@Module({
  controllers: [RevenueCatController],
  providers: [RevenueCatService],
  imports: [SubscriptionModule],
})
export class RevenueCatModule {}
