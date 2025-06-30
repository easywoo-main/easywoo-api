import { Module } from '@nestjs/common';
import { StepChatMessageModule } from './modules/step-chat-message/step-chat-message.module';
import { ResultSliderPropModule } from './modules/result-slider-prop/result-slider-prop.module';
import { ProgressTrackerChatController } from './progress-tracker-chat.controller';
import { ProgressTrackerChatService } from './progress-tracker-chat.service';
import { ChatMessageModule } from '../chat-message/chat-message.module';
import { MessageChoiceModule } from '../message-choice/message-choice.module';
import { SubscriptionModule } from '../subscription/subscription.module';

@Module({
  imports: [StepChatMessageModule, ResultSliderPropModule, ChatMessageModule, MessageChoiceModule, SubscriptionModule],
  controllers: [ProgressTrackerChatController],
  providers: [ProgressTrackerChatService]
})
export class ProgressTrackerChatModule {
}
