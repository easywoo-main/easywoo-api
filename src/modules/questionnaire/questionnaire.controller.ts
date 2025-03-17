import { Controller, Get, Query } from '@nestjs/common';
import {QuestionnaireService} from "./questionnaire.service";

@Controller('questionnaire')
export class QuestionnaireController {

  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Get('/')
  public async getAllQuizzes(@Query("step") step: number) {
    return this.questionnaireService.getAllQuizzes(step);
  }
}
