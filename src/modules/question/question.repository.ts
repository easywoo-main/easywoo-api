import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class QuestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async getAllQuizzes(userId: string) {
    return this.prisma.question.findMany({
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
