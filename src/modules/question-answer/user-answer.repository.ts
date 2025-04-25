import { Injectable } from "@nestjs/common";
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class UserAnswerRepository{

  constructor(private readonly prisma: PrismaService) {}


  public async createUserAnswer(answerId: string, userId?: string) {
    return this.prisma.userAnswer.create({
      data: {
        answerId,
        userId
      }
    });
  }

  public async deleteUserAnswer(answerId: string, userId?: string) {
    return this.prisma.userAnswer.deleteMany({
      where: {
        answerId,
        userId
      }
    });
  }
}