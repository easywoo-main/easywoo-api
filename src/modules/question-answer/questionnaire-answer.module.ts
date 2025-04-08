import { Module } from '@nestjs/common';
import { QuestionnaireAnswerController } from './questionnaire-answer.controller';
import { QuestionnaireAnswerService } from './questionnaire-answer.service';
import { QuestionnaireAnswerRepository } from './questionnaireAnswer.repository';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';
import { QuestionModule } from '../question/question.module';
import { ReportModule } from '../report/report.module';

@Module({
  imports: [QuestionModule, UserModule, TokenModule, ReportModule],
  controllers: [QuestionnaireAnswerController],
  providers: [QuestionnaireAnswerService, QuestionnaireAnswerRepository, ],
})
export class QuestionnaireAnswerModule {}
