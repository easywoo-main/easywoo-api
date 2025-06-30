import { Module } from '@nestjs/common';
import { StepChatMessageService } from './step-chat-message.service';
import { StepChatMessageRepository } from './step-chat-message.repository';
import { TokenModule } from 'src/modules/token/token.module';
import { UserModule } from 'src/modules/user/user.module';
import { ChatMessageModule } from 'src/modules/chat-message/chat-message.module';

@Module({
  providers: [StepChatMessageService, StepChatMessageRepository],
  imports: [TokenModule, UserModule, ChatMessageModule],
  exports: [StepChatMessageService],
})
export class StepChatMessageModule {}
