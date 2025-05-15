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
import { EasywooApiService } from './modules/easywoo-api/easywoo-api.service';
import * as cheerio from 'cheerio';
import { QuestionnaireAnswerCreateDto } from '../question-answer/dtos/questionnaireAnswerCreate.dto';
import { Repository } from '../../database/repository.service';
import { Prisma } from '.prisma/client';

@Injectable()
export class ReportRepository {
  private readonly reportRepository: Prisma.ReportDelegate;
  constructor(repository: Repository) {
    this.reportRepository = repository.report
  }

  public async createReport(answersIds: string[], userId?: string) {
    return this.reportRepository.create({
      data: {
        userId,
        answer: {
          connect: answersIds.map(answersId => {
            return { id: answersId };
          })
        }
      }
    });
  }
}
