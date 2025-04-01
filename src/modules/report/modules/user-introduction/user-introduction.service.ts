import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { GenerateReportSectionInterface } from '../../generateReportSection.interface';
import { QuestionnaireDto } from '../../../question/dtos/questionnaire.dto';
import { SentenceService } from '../sentence/sentence.service';
import { SentenceType } from '@prisma/client';
import { SentenceEntity } from '../../sentence.entity';
import { EvaluatorService } from '../evaluator/evaluator.service';
import { Condition } from '../evaluator/condition.dto';

@Injectable()
export class UserIntroductionService implements GenerateReportSectionInterface {
  constructor(
    private readonly sentenceService: SentenceService,
    private readonly evaluatorService: EvaluatorService,
  ) {}

  public async generateReportSection(userId: string, questionnaire: QuestionnaireDto): Promise<string> {
    const sentences: SentenceEntity[] = await this.sentenceService.getAllSentencesByType(SentenceType.UserIntroduction);
    let results = '';
    for (const sentence of sentences) {
      if (this.evaluatorService.checkCondition(sentence.condition as Condition, questionnaire.questionnaire)) {
        results += sentence.sentence;
      }
    }
    return results;
  }

  public getName(): string {
    return 'Let’s look at you';
  }
}
