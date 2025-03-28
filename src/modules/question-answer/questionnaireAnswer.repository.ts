import { Injectable } from '@nestjs/common';
import { QuestionnaireAnswerCreateDto } from './dtos/questionnaireAnswerCreate.dto';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class QuestionnaireAnswerRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createQuestionnaireAnswer(answerId: string, userId: string) {
    return this.prisma.answer.update({
      where: {
        id: answerId,
      },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  public async disconnectQuestionnaireAnswer(answerId: string, userId: string) {
    return this.prisma.answer.update({
      where: {
        id: answerId,
      },
      data: {
        users: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
  }

  public async findAnswerById(answerId: string, userId: string) {
    return this.prisma.answer.findUnique({
      where: {
        id: answerId,
      },
      include:{
        users: {
          where: {
            id: userId,
          },
        },
      }
    });
  }
}
