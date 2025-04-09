import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class QuestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async getAllQuestionsByStep(userId: string, step?: number) {
    return this.prisma.question.findMany({
      where: {
        ...(step && {step})
      },
      include: {
        answers: {
          include: {
            users: {
              where: {
                id: userId,
              },
            },
          },
        },
      },
    });
  }

  public async getAllQuestions(step?: number) {
    return this.prisma.question.findMany({
      where: {
        ...(step && {step})
      },
      include: {
        answers: true
      }
    });
  }

  public async getOneQuestion(questionId: string, userId: string) {
    return this.prisma.question.findUnique({
      where: {
        id: questionId,
      },
      include: {
        answers: {
          include: {
            users: {
              where: {
                id: userId,
              },
            },
          },
        },
      },
    });
  }
}
