import { Module } from '@nestjs/common';
import { StepChatMessageModule } from './modules/step-chat-message/step-chat-message.module';
import { ResultMessageChoiceModule } from './modules/result-message-choice/result-message-choice.module';
import { ResultSliderPropModule } from './modules/result-slider-prop/result-slider-prop.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [StepChatMessageModule, ResultMessageChoiceModule, ResultSliderPropModule,]
})
export class ProgresTrackerChatModule {}
