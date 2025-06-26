import { Module } from '@nestjs/common';
import { RevolutController } from './revolut.controller';
import { RevolutService } from './revolut.service';
import { getEmailClient } from '../../../configs/email-client.config';
import { ConfigService } from '@nestjs/config';
import { SubscriptionModule } from '../subscription.module';
import { ChatModule } from '../../chat/chat.module';
import { RevolutOrderRepository } from './revolut-order.repository';
import { getRevolutClient } from '../../../configs/revolut-client.config';

@Module({
  controllers: [RevolutController],
  providers: [RevolutService,
    RevolutOrderRepository,
    {
    provide: 'REVOLUT_CLIENT',
    useFactory: getRevolutClient,
    inject: [ConfigService],
  }],
  imports: [ChatModule, SubscriptionModule],
})
export class RevolutModule {}
