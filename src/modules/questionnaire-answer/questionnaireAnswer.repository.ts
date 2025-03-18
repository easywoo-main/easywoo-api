import { Injectable } from '@nestjs/common';
import { QuestionnaireAnswerCreateDto } from './dtos/questionnaireAnswerCreate.dto';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class QuestionnaireAnswerRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createQuestionnaireAnswer(questionnaireAnswerCreateDto: QuestionnaireAnswerCreateDto) {
    return this.prisma.questionnaireAnswer.create({
      data: questionnaireAnswerCreateDto,
    });
  }
}
