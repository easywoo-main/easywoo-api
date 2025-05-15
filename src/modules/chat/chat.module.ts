import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatRepository } from './chat.repository';
import { ChatMessageModule } from '../chat-message/chat-message.module';
import { MessageSliderModule } from '../message-slider/message-slider.module';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatRepository],
  imports: [ ChatMessageModule, MessageSliderModule],
})
export class ChatModule {}
