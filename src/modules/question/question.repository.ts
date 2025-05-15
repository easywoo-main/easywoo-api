import { Injectable } from '@nestjs/common';
import { Repository } from '../../database/repository.service';
import { QuestionDto } from './dtos/question.dto';
import { Prisma } from '.prisma/client';

@Injectable()
export class QuestionRepository {
  private readonly  questionRepository: Prisma.QuestionDelegate;
  constructor(repository: Repository) {
    this.questionRepository = repository.question;
  }
  public async getAllQuestions(step?: number): Promise<QuestionDto[]> {
    return this.questionRepository.findMany({
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
    return this.questionRepository.findUnique({
      where: {
        id: questionId,
      },
      include: {
        answers: true
      },
    });
  }
}
