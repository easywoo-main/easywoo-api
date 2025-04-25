import { Injectable } from '@nestjs/common';
import { QuestionnaireAnswerCreateDto } from './dtos/questionnaireAnswerCreate.dto';
import { PrismaService } from '../../database/prisma.service';
import { AnswerEntity } from './questionnaireAnswer.entity';

@Injectable()
export class QuestionnaireAnswerRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findAnswerById(answerId: string, userId?: string): Promise<AnswerEntity> {
    return this.prisma.answer.findUnique({
      where: {
        id: answerId,
      },
      // include: {
      //   users: {
      //     where: {
      //       id: userId, //todo
      //     },
      //   },
      // },
    });
  }
}
