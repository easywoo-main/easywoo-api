import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TokenModule } from './modules/token/token.module';
import { DatabaseModule } from './database/database.module';
import { ReportModule } from './modules/report/report.module';
import { QuestionModule } from './modules/question/question.module';
import { QuestionnaireAnswerModule } from './modules/question-answer/questionnaire-answer.module';
import { PostModule } from './modules/post/post.module';

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
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
