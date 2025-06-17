import { Module } from '@nestjs/common';
import { StepChatMessageModule } from './modules/step-chat-message/step-chat-message.module';
import { ResultMessageChoiceModule } from './modules/result-message-choice/result-message-choice.module';
import { ResultSliderPropModule } from './modules/result-slider-prop/result-slider-prop.module';
import { ProgressTrackerChatController } from './progress-tracker-chat.controller';
import { ProgressTrackerChatService } from './progress-tracker-chat.service';
import { ChatMessageModule } from '../chat-message/chat-message.module';
import { MessageChoiceModule } from '../message-choice/message-choice.module';
import { UserTextMessageAnswerModule } from './modules/user-text-message-answer/user-text-message-answer.module';

@Module({
  imports: [StepChatMessageModule, ResultMessageChoiceModule, ResultSliderPropModule, ChatMessageModule, MessageChoiceModule, UserTextMessageAnswerModule],
  controllers: [ProgressTrackerChatController],
  providers: [ProgressTrackerChatService]
})
export class ProgressTrackerChatModule {}
