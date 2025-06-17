import { BadRequestException, Injectable } from '@nestjs/common';
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
import { EasywooApiService } from './modules/easywoo-api/easywoo-api.service';
import * as cheerio from 'cheerio';
import { QuestionnaireAnswerCreateDto } from '../question-answer/dtos/questionnaireAnswerCreate.dto';
import { ReportRepository } from './report.repository';
import { QuestionService } from '../question/question.service';
import { QuestionnaireAnswerService } from '../question-answer/questionnaire-answer.service';

@Injectable()
export class ReportService {
  constructor(
    private readonly sentenceService: SentenceService,
    private readonly evaluatorService: EvaluatorService,
    private readonly pdfService: PdfService,
    private readonly carePlanService: CarePlanService,
    private readonly easywooApiService: EasywooApiService,
    private readonly reportRepository: ReportRepository,
    private readonly questionService: QuestionService,
    private readonly questionnaireAnswerService: QuestionnaireAnswerService
  ) {
  }

  public async generateReportV2(questions: QuestionWithUserAnswerDto[], reportId: string): Promise<ReportDto> {
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

    const reportSection: ReportSectionDto[] = await Promise.all(
      REPORT_SECTIONS.map(async (reportSection): Promise<ReportSectionDto> => {
        let { sentences, count } = await this.generateReportSection(questionnaire, reportSection.type);
        if (count < reportSection.minimumNumberSentences) {
          sentences += reportSection.sentence;
        }
        return {
          name: reportSection.name,
          content: sentences
        };
      })
    );


    const [carePlan, file] = await Promise.all([
      this.carePlanService.generateReportSection(questionnaire),
      this.pdfService.generatePdfReport(reportSection)
    ]);

    return {
      reportId,
      reportSection,
      carePlan,
      file
    };
  }

  private async generateReportSection(questionnaire: QuestionnaireDto, sentenceType: SentenceType): Promise<{
    sentences: string,
    count: number
  }> {
    const sentences = await this.sentenceService.getAllSentencesByType(sentenceType);
    let count = 0;
    let results = '';
    for (const sentence of sentences) {
      if (this.evaluatorService.chekObj(sentence.condition as Condition, questionnaire)) {
        results += sentence.sentence;
        count++;
      }
    }
    return { sentences: results, count };
  }

  private async generateReport(questions: QuestionWithUserAnswerDto[], reportId: string) {
    let questionnaire = {};

    for (const question of questions) {
      for (const answer of question.answers) {
        if (answer.isAnswered) {
          if (question.type === QuestionsType.MULTIPLE) {
            (questionnaire[question.easywooName] ??= []).push(answer.easywooName);
          } else {
            questionnaire[question.easywooName] = answer.easywooName;
          }
        }
      }
    }

    return  await this.easywooApiService.generateReport(questionnaire);
    /**
     *     const page = await this.easywooApiService.generateReport(questionnaire);
    const reportSection = await this.parseReportSection(page);
    const file = await this.pdfService.generatePdfReport(reportSection, reportId);
    return { reportSection, file, reportId, carePlan: null };
     */
  }

  private async parseReportSection(page: string) {
    const $ = cheerio.load(page);
    const reportSection: ReportSectionDto[] = [];
    $('h2[style="color:#ed7d31"]').each((_, header) => {
      const textAfterHeader = $(header).next('p').text();
      reportSection.push({ name: $(header).text().trim(), content: textAfterHeader.trim() });
      console.log({ name: $(header).text(), content: textAfterHeader.trim() });
    });
    return reportSection;
  }

  private async parseCarePlanSection(page: string) {
    const $ = cheerio.load(page);
    const carePlan: ReportSectionDto[] = [];
    $('h2[style="color:#ed7d31"]').each((_, header) => {
      const textAfterHeader = $(header).next('p').text();
      carePlan.push({ name: $(header).text().trim(), content: textAfterHeader.trim() });
      console.log({ name: $(header).text(), content: textAfterHeader.trim() });
    });
    return carePlan;
  }

  public async createReport(questionnaireAnswerCreateDtos: QuestionnaireAnswerCreateDto[], userId?: string) {
    const uniqueQuestionIds = new Set(questionnaireAnswerCreateDtos.map((item) => item.questionId));
    if (uniqueQuestionIds.size !== questionnaireAnswerCreateDtos.length) {
      throw new BadRequestException('Duplicate questionId found in questionnaireAnswerCreateDto');
    }

    await Promise.all(
      questionnaireAnswerCreateDtos.map(async (questionnaireAnswerCreateDto) => {
        const question = await this.questionService.getOneQuestion(questionnaireAnswerCreateDto.questionId);
        question.answers.forEach(answer => {
          // if (!questionnaireAnswerCreateDto.answerIds.includes(answer.id)) {
          //   throw new BadRequestException('Unknown answer provided');
          // }//todo

          if ([QuestionsType.SINGLE, QuestionsType.SLIDER].includes(question.type as any) && questionnaireAnswerCreateDto.answerIds.length > 1) {
            throw new BadRequestException('Invalid answer type');
          }
        });
      }));

    const newReport = await this.reportRepository.createReport(questionnaireAnswerCreateDtos.flatMap((item) => item.answerIds), userId);
    const questionnaire: QuestionWithUserAnswerDto[] = await Promise.all(
      questionnaireAnswerCreateDtos.map(async (questionnaireAnswerCreateDto): Promise<QuestionWithUserAnswerDto> =>
        await this.questionnaireAnswerService.getQuestionnaireAnswer(questionnaireAnswerCreateDto))
    );
    return this.generateReport(questionnaire, newReport.id);
  }
}
