import { Injectable } from '@nestjs/common';
import { QuestionnaireAnswerRepository } from './questionnaireAnswer.repository';
import { QuestionnaireAnswerCreateDto } from './dtos/questionnaireAnswerCreate.dto';

@Injectable()
export class QuestionnaireAnswerService {
  constructor(private readonly questionnaireAnswerRepository: QuestionnaireAnswerRepository) {}

  public async getAllQuestionnaireAnswersByUserId(userId: string, step: number) {
    return;
  }

  public async createQuestionnaireAnswer(questionnaireAnswerCreateDto: QuestionnaireAnswerCreateDto, userId: string) {
    questionnaireAnswerCreateDto.userId = userId;
    return this.questionnaireAnswerRepository.createQuestionnaireAnswer(questionnaireAnswerCreateDto);
  }
}
