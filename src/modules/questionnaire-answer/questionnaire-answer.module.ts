import { Module } from '@nestjs/common';
import { QuestionnaireAnswerController } from './questionnaire-answer.controller';
import { QuestionnaireAnswerService } from './questionnaire-answer.service';
import {QuestionnaireAnswerRepository} from "./questionnaireAnswer.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {QuestionnaireAnswer} from "./questionnaireAnswer.entity";
import {TokenModule} from "../token/token.module";
import {UserModule} from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionnaireAnswer]), TokenModule, UserModule],
  controllers: [QuestionnaireAnswerController],
  providers: [QuestionnaireAnswerService, QuestionnaireAnswerRepository]
})
export class QuestionnaireAnswerModule {}
