import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Questionnaire } from './questionnaire.entity';

@Injectable()
export class QuestionnaireRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async getAllQuizzes(userId: string, step?: number) {
    return this.prisma.questionnaire.findMany({
      where: {
        ...(step && { step }),
      },
      include: {
        userAnswers: {
          where: {
            userId,
          },
        },
      },
    });
  }
}
