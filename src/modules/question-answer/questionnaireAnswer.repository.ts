import { Injectable } from '@nestjs/common';
import { QuestionnaireAnswerCreateDto } from './dtos/questionnaireAnswerCreate.dto';
import { Repository } from '../../database/repository.service';
import { AnswerEntity } from './questionnaireAnswer.entity';
import { Prisma } from '.prisma/client';

@Injectable()
export class QuestionnaireAnswerRepository {
  private readonly  questionnaireAnswerRepository: Prisma.AnswerDelegate;
  constructor(repository: Repository) {
    this.questionnaireAnswerRepository = repository.answer
  }

  public async findAnswerById(answerId: string, userId?: string): Promise<AnswerEntity> {
    return this.questionnaireAnswerRepository.findUnique({
      where: {
        id: answerId,
      },
    });
  }
}
