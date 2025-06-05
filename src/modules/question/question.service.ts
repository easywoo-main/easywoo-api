import { Injectable } from '@nestjs/common';
import { QuestionRepository } from './question.repository';
import { QuestionDto } from './dtos/question.dto';
import { QuestionMapper } from './question.mapper';
import { QuestionResponseDto } from './dtos/questionResponse.dto';
import { QuestionEntity } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionnaireRepository: QuestionRepository,
    private readonly questionMapper: QuestionMapper
  ) {
  }

  public async getOneQuestion(questionId: string) {
    return this.questionnaireRepository.getOneQuestion(questionId);
  }

  public async getQuestionByStep(step: number): Promise<QuestionResponseDto[]> {
    const questions = await this.questionnaireRepository.getAllQuestions(step);
    return questions.map(this.questionMapper.toResponseDto)
  }
}
