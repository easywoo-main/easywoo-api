import { Module } from '@nestjs/common';
import { ChatMessageController } from './chat-message.controller';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageRepository } from './chat-message.repository';
import { MessageSliderModule } from '../message-slider/message-slider.module';
import { InfoPopUpModule } from '../info-pop-up/info-pop-up.module';

@Module({
  controllers: [ChatMessageController],
  providers: [ChatMessageService, ChatMessageRepository],
  exports: [ChatMessageService],
  imports:[MessageSliderModule, InfoPopUpModule],
})
export class ChatMessageModule {}
