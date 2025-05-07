import { Module } from '@nestjs/common';
import { StepChatMessageController } from './step-chat-message.controller';
import { StepChatMessageService } from './step-chat-message.service';
import { StepChatMessageRepository } from './step-chat-message.repository';
import { TokenModule } from 'src/modules/token/token.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  controllers: [StepChatMessageController],
  providers: [StepChatMessageService, StepChatMessageRepository],
  imports: [TokenModule, UserModule],
})
export class StepChatMessageModule {}
