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
import { SliderPropModule } from './modules/slider-prop/slider-prop.module';
import { CredentialsModule } from './modules/auth/credentials/credentials.module';
import { envSchema } from './schemas/env.schema';
import { AdminModule } from './modules/admin/admin.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // validationSchema: envSchema
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
    SliderPropModule,
    CredentialsModule,
    AdminModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
