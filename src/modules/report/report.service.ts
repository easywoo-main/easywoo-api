import { Injectable } from '@nestjs/common';
import { QuestionnaireDto } from '../question/dtos/questionnaire.dto';
import { ReportDto } from './dto/report.dto';
import { SentenceType } from '@prisma/client';
import { SentenceService } from './modules/sentence/sentence.service';
import { Condition } from './modules/evaluator/condition.dto';
import { EvaluatorService } from './modules/evaluator/evaluator.service';
import { REPORT_SECTIONS } from './utils/reportSections.untils';
import { CarePlanService } from './modules/care-plan/care-plan.service';
import { ReportSectionDto } from './dto/reportSection.dto';
import { PdfService } from './modules/pdf/pdf.service';
import { QuestionWithUserAnswerDto } from '../question/dtos/QuestionWithUserAnswerDto';
import { PdfLocationDto } from './modules/pdf/dto/pdfLocation.dto';

@Injectable()
export class ReportService {
  constructor(
    private readonly sentenceService: SentenceService,
    private readonly evaluatorService: EvaluatorService,
    private readonly pdfService: PdfService,
    private readonly carePlanService: CarePlanService,
  ) {}
  public async generateReport(questions: QuestionWithUserAnswerDto[]): Promise<ReportDto> {
    const questionnaire: QuestionnaireDto = new QuestionnaireDto();

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

    const [carePlan, file] = await Promise.all([
      this.carePlanService.generateReportSection(questionnaire),
      this.pdfService.generatePdfReport(reportSection),//{location: new URL("http://localhost:8082")} as PdfLocationDto
    ]);

    return {
      reportSection,
      carePlan,
      file
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
