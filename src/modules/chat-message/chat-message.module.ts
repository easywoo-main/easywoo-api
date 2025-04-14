import { Module } from '@nestjs/common';
import { ChatMessageController } from './chat-message.controller';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageRepository } from './chat-message.repository';

@Module({
  controllers: [ChatMessageController],
  providers: [ChatMessageService, ChatMessageRepository],
})
export class ChatMessageModule {}
