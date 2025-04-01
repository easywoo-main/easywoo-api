import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { GenerateReportSectionInterface } from '../../generateReportSection.interface';
import { QuestionnaireDto } from '../../../question/dtos/questionnaire.dto';
import { SentenceEntity } from '../../sentence.entity';
import { SentenceType } from '@prisma/client';
import { SentenceService } from '../sentence/sentence.service';
import { Condition } from '../evaluator/condition.dto';
import { EvaluatorService } from '../evaluator/evaluator.service';

@Injectable()
export class DeepDiveService implements GenerateReportSectionInterface {
  constructor(
    private readonly sentenceService: SentenceService,
    private readonly evaluatorService: EvaluatorService,
  ) {}

  name: string = 'Scratching beneath the surface';
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
  getName(): string {
    return this.name;
  }
}
