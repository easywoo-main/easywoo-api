import { Module } from '@nestjs/common';
import { MessageChoiceController } from './message-choice.controller';
import { MessageChoiceService } from './message-choice.service';
import { MessageChoiceRepository } from './message-choice.repository';
import { ChatMessageModule } from '../chat-message/chat-message.module';

@Module({
  controllers: [MessageChoiceController],
  providers: [MessageChoiceService, MessageChoiceRepository],
  exports: [MessageChoiceService, MessageChoiceRepository],
})
export class MessageChoiceModule {}
