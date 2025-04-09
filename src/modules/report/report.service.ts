import { Injectable } from '@nestjs/common';
import { QuestionService } from '../question/question.service';
import { QuestionnaireDto } from '../question/dtos/questionnaire.dto';
import { ReportDto } from './dto/report.dto';
import { SentenceType } from '@prisma/client';
import { SentenceService } from './modules/sentence/sentence.service';
import { Condition } from './modules/evaluator/condition.dto';
import { EvaluatorService } from './modules/evaluator/evaluator.service';
import { REPORT_SECTIONS } from './utils/reportSections.untils';
import { CarePlanService } from './modules/care-plan/care-plan.service';
import { CarePlanDto } from './dto/carePlan.dto';
import { ReportSectionDto } from './dto/reportSection.dto';

@Injectable()
export class ReportService {
  constructor(
    private readonly questionnaireService: QuestionService,
    private readonly sentenceService: SentenceService,
    private readonly evaluatorService: EvaluatorService,

    private readonly carePlanService: CarePlanService,
  ) {}
  public async generateReport(userId: string): Promise<ReportDto> {
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

    const reportSection: ReportSectionDto[] = await Promise.all(
      REPORT_SECTIONS.map(async (reportSection): Promise<ReportSectionDto> => {
        return {
          name: reportSection.name,
          content: await this.generateReportSection(questionnaire, reportSection.type),
        };
      }),
    );

    const carePlan: CarePlanDto[] = await this.carePlanService.generateReportSection(questionnaire);

    return {
      reportSection,
      carePlan,
    };
  }

  private async generateReportSection(questionnaire: QuestionnaireDto, sentenceType: SentenceType): Promise<string> {
    const sentences = await this.sentenceService.getAllSentencesByType(sentenceType);
    let results = '';
    for (const sentence of sentences) {
      if (this.evaluatorService.checkCondition(sentence.condition as Condition, questionnaire)) {
        results += sentence.sentence;
      }
    }
    return results;
  }
}
