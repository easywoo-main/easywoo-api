import { Injectable } from '@nestjs/common';
import { QuestionnaireDto } from '../../../question/dtos/questionnaire.dto';
import { SentenceService } from '../sentence/sentence.service';
import { EvaluatorService } from '../evaluator/evaluator.service';
import { Condition } from '../evaluator/condition.dto';
import { SentenceType } from '@prisma/client';

@Injectable()
export class CarePlanService {
  constructor(
    private readonly sentenceService: SentenceService,
    private readonly evaluatorService: EvaluatorService) {
  }
  async generateReportSection(questionnaire: QuestionnaireDto) {
    const sentences = await this.sentenceService.getAllSentencesByType(SentenceType.CARE_PLAN);
    const results: string  = [];
    for (const sentence of sentences) {
      if (this.evaluatorService.checkCondition(sentence.condition as Condition, questionnaire)) {

      }
    }
    return results;
  }
}
