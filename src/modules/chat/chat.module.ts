import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatRepository } from './chat.repository';
import { ChatMessageModule } from '../chat-message/chat-message.module';
import { MessageSliderModule } from '../message-slider/message-slider.module';
import { SubscriptionService } from '../subscription/subscription.service';
import { SubscriptionModule } from '../subscription/subscription.module';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatRepository],
  imports: [ChatMessageModule, MessageSliderModule, SubscriptionModule],
  exports: [ChatService],
})
export class ChatModule {
}
