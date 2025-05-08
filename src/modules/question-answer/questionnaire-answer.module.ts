import { Module } from '@nestjs/common';
import { QuestionnaireAnswerService } from './questionnaire-answer.service';
import { QuestionnaireAnswerRepository } from './questionnaireAnswer.repository';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [QuestionModule],
  providers: [QuestionnaireAnswerService, QuestionnaireAnswerRepository],
  exports: [QuestionnaireAnswerService]
})
export class QuestionnaireAnswerModule {}
