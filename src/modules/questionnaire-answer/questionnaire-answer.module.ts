import { Module } from '@nestjs/common';
import { QuestionnaireAnswerController } from './questionnaire-answer.controller';
import { QuestionnaireAnswerService } from './questionnaire-answer.service';
import { QuestionnaireAnswerRepository } from './questionnaireAnswer.repository';
import { DatabaseModule } from '../../database/database.module';
import { QuestionnaireModule } from '../questionnaire/questionnaire.module';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [QuestionnaireModule, UserModule, TokenModule],
  controllers: [QuestionnaireAnswerController],
  providers: [QuestionnaireAnswerService, QuestionnaireAnswerRepository],
})
export class QuestionnaireAnswerModule {}
