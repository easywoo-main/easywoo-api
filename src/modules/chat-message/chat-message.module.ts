import { Module } from '@nestjs/common';
import { ChatMessageController } from './chat-message.controller';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageRepository } from './chat-message.repository';
import { MessageSliderModule } from '../message-slider/message-slider.module';
import { MessageChoiceModule } from '../message-choice/message-choice.module';

@Module({
  controllers: [ChatMessageController],
  providers: [ChatMessageService, ChatMessageRepository],
  imports:[MessageSliderModule, MessageChoiceModule],
  exports: [ChatMessageService]
})
export class ChatMessageModule {}
