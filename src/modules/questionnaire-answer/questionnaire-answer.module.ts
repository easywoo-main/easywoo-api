import { Module } from '@nestjs/common';
import { QuestionnaireAnswerController } from './questionnaire-answer.controller';
import { QuestionnaireAnswerService } from './questionnaire-answer.service';
import { QuestionnaireAnswerRepository } from './questionnaireAnswer.repository';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '../../database/database.module';
import {QuestionnaireModule} from "../questionnaire/questionnaire.module";

@Module({
  imports: [DatabaseModule, TokenModule, UserModule, QuestionnaireModule],
  controllers: [QuestionnaireAnswerController],
  providers: [QuestionnaireAnswerService, QuestionnaireAnswerRepository],
})
export class QuestionnaireAnswerModule {}
