import { Injectable } from '@nestjs/common';
import { QuestionService } from '../question/question.service';
import { QuestionnaireDto } from '../question/dtos/questionnaire.dto';
import { ReportDto } from './dto/report.dto';
import { SentenceType } from '@prisma/client';
import { REPORT_SECTIONS } from '../../utils/constants.utils';
import { EvaluatorService } from './evaluator.service';
import { SentenceService } from './modules/sentence/sentence.service';
import { Condition } from './dto/condition.dto';

@Injectable()
export class ReportService {
  constructor(
    private readonly questionnaireService: QuestionService,
    private readonly sentenceService: SentenceService,
    private readonly evaluatorService: EvaluatorService,
  ) {}
  public async generateReport(userId: string): Promise<ReportDto[]> {
    const questions = await this.questionnaireService.getAllQuestions(userId);

    const questionnaire: QuestionnaireDto = new QuestionnaireDto();

    //questionnaire
    for (const question of questions) {
      for (const answer of question.answers) {
        (questionnaire[question.name] ??= {})[answer.name] = answer.isAnswered;
        if (answer.evaluation) {
          for (const [key, value] of Object.entries(answer.evaluation)) {
            const [mainKey, subKey] = key.split('.');

            questionnaire[mainKey] ??= {};
            questionnaire[mainKey][subKey] ??= 0;
            questionnaire[mainKey][subKey] += value;
          }
        }
      }
    }

    console.log('questionnaire', questionnaire);

    return await Promise.all(
      REPORT_SECTIONS.map(async (generateReportSectionInterface) => {
        return {
          name: generateReportSectionInterface.name,
          content: await this.generateReportSection(questionnaire, generateReportSectionInterface.type),
        };
      }),
    );
  }

  private async generateReportSection(questionnaire: QuestionnaireDto, sentenceType: SentenceType): Promise<string> {
    const sentences = await this.sentenceService.getAllSentencesByType(sentenceType);
    console.log('sentenceType', sentenceType, sentences.length);
    let results = '';
    for (const sentence of sentences) {
      if (this.evaluatorService.checkCondition(sentence.condition as Condition, questionnaire)) {
        results += sentence.sentence;
      }
    }
    return results;
  }
}
