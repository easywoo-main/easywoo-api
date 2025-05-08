import { Injectable } from '@nestjs/common';
import { QuestionnaireDto } from '../question/dtos/questionnaire.dto';
import { ReportDto } from './dto/report.dto';
import { QuestionsType, SentenceType } from '@prisma/client';
import { SentenceService } from './modules/sentence/sentence.service';
import { Condition } from './modules/evaluator/condition.dto';
import { EvaluatorService } from './modules/evaluator/evaluator.service';
import { REPORT_SECTIONS } from './utils/reportSections.untils';
import { CarePlanService } from './modules/care-plan/care-plan.service';
import { ReportSectionDto } from './dto/reportSection.dto';
import { PdfService } from './modules/pdf/pdf.service';
import { QuestionWithUserAnswerDto } from '../question/dtos/QuestionWithUserAnswerDto';
import {EasywooApiService} from './modules/easywoo-api/easywoo-api.service'
import * as cheerio from 'cheerio';

@Injectable()
export class ReportService {
  constructor(
    private readonly sentenceService: SentenceService,
    private readonly evaluatorService: EvaluatorService,
    private readonly pdfService: PdfService,
    private readonly carePlanService: CarePlanService,
    private readonly easywooApiService: EasywooApiService
  ) {}
  public async generateReport(questions: QuestionWithUserAnswerDto[]): Promise<ReportDto> {
    const questionnaire: QuestionnaireDto = new QuestionnaireDto();

    for (const question of questions) {
      for (const answer of question.answers) {
        (questionnaire[question.name] ??= {})[answer.name] = answer.isAnswered;
        if (answer.evaluation && answer.isAnswered) {
          for (const [key, value] of Object.entries(answer.evaluation)) {
            const [mainKey, subKey] = key.split('.');

            questionnaire[mainKey] ??= {};
            questionnaire[mainKey][subKey] ??= 0;
            questionnaire[mainKey][subKey] += value;
          }
        }
      }
    }

    console.log(questionnaire);

    const reportSection: ReportSectionDto[] = await Promise.all(
      REPORT_SECTIONS.map(async (reportSection): Promise<ReportSectionDto> => {
        let {sentences, count} =  await this.generateReportSection(questionnaire, reportSection.type)
        if (count < reportSection.minimumNumberSentences) {
          sentences += reportSection.sentence;
        }
        return {
          name: reportSection.name,
          content: sentences,
        };
      }),
    );


    const [carePlan, file] = await Promise.all([
      this.carePlanService.generateReportSection(questionnaire),
      this.pdfService.generatePdfReport(reportSection),
    ]);

    return {
      reportSection,
      carePlan,
      file
    };
  }

  private async generateReportSection(questionnaire: QuestionnaireDto, sentenceType: SentenceType): Promise<{sentences: string, count: number}> {
    const sentences = await this.sentenceService.getAllSentencesByType(sentenceType);
    let count = 0;
    let results = '';
    for (const sentence of sentences) {
      if (this.evaluatorService.chekObj(sentence.condition as Condition, questionnaire)) {
        results += sentence.sentence;
        count++
      }
    }
    return {sentences: results, count};
  }

  public async sendQuestionnaireToEasywooApi(questions: QuestionWithUserAnswerDto[]){
    let questionnaire = {};

    for (const question of questions) {
      for (const answer of question.answers) {
        if (answer.isAnswered) {
          if(question.type === QuestionsType.MULTIPLE) {
            (questionnaire[question.easywooName] ??= []).push(answer.easywooName);
          } else {
            questionnaire[question.easywooName] = answer.easywooName;
          }
        }
      }
    }

    const page = await this.easywooApiService.generateReport(questionnaire);
    await this.parseReportPage(page);
    return page
  }

  public async parseReportPage(page: string) {
    const $ = cheerio.load(page);
    const reportSection: ReportSectionDto[] = [];
    $('h2[style="color:#ed7d31"]').each((index, header) => {
      const textAfterHeader = $(header).next('p').text();
      reportSection.push({name: $(header).text(), content: textAfterHeader});
      console.log({name: $(header).text(), content: textAfterHeader.trim()})
    });
    return reportSection;
  }
}
