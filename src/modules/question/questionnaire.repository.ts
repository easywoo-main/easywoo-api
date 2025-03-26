import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class QuestionnaireRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async getAllQuizzes(userId: string, step?: number) {
    return this.prisma.question.findMany({
      where: {
        ...(step && { step }),
      },
      include: {
        answers: {
          include: {
            user: {
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
