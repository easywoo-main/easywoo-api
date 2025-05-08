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
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ReportRepository {
  constructor(
    private readonly prisma: PrismaService
  ) {
  }

  public async createReport(answersIds: string[], userId?: string) {
    return this.prisma.report.create({
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
