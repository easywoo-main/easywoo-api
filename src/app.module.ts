import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TokenModule } from './modules/token/token.module';
import { QuestionnaireModule } from './modules/questionnaire/questionnaire.module';
import { QuestionnaireAnswerModule } from './modules/questionnaire-answer/questionnaire-answer.module';
import { DatabaseModule } from './database/database.module';
import { ReportModule } from './modules/report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    TokenModule,
    QuestionnaireModule,
    QuestionnaireAnswerModule,
    ReportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
