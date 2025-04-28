import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { QuestionDto } from './dtos/question.dto';
import { Prisma } from '.prisma/client';

@Injectable()
export class QuestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async getAllQuestions(step?: number): Promise<QuestionDto[]> {
    return this.prisma.question.findMany({
      where: {
        ...(step && { step })
      },
      orderBy: [
        { step: Prisma.SortOrder.asc },
        { createdAt: Prisma.SortOrder.asc },
      ],
      include: {
        answers: true
      }
    });
  }

  public async getOneQuestion(questionId: string): Promise<QuestionDto> {
    return this.prisma.question.findUnique({
      where: {
        id: questionId,
      },
      include: {
        answers: true
      },
    });
  }
}
