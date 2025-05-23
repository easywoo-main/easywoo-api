import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TokenModule } from './modules/token/token.module';
import { DatabaseModule } from './database/database.module';
import { ReportModule } from './modules/report/report.module';
import { QuestionModule } from './modules/question/question.module';
import { QuestionnaireAnswerModule } from './modules/question-answer/questionnaire-answer.module';
import { CourseModule } from './modules/course/course.module';
import { ChatModule } from './modules/chat/chat.module';
import { ChatMessageModule } from './modules/chat-message/chat-message.module';
import { MessageChoiceModule } from './modules/message-choice/message-choice.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { StorageModule } from './modules/storage/storage.module';
import { MessageSliderModule } from './modules/message-slider/message-slider.module';
import { ProgressTrackerChatModule } from './modules/progres-tracker-chat/progress-tracker-chat.module';
import { InfoPopUpModule } from './modules/info-pop-up/info-pop-up.module';
import { PaintPointModule } from './modules/paint-point/paint-point.module';
import { SliderPropModule } from './modules/slider-prop/slider-prop.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    TokenModule,
    QuestionModule,
    QuestionnaireAnswerModule,
    ReportModule,
    CourseModule,
    ChatModule,
    ChatMessageModule,
    MessageChoiceModule,
    SubscriptionModule,
    StorageModule,
    MessageSliderModule,
    ProgressTrackerChatModule,
    InfoPopUpModule,
    PaintPointModule,
    SliderPropModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
