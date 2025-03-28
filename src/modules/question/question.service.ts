import { Injectable } from '@nestjs/common';
import { QuestionRepository } from './question.repository';
import { QuestionDto } from './dtos/question.dto';
import { QuestionMapper } from './question.mapper';

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionnaireRepository: QuestionRepository,
    private readonly questionMapper: QuestionMapper,
  ) {}

  public async getAllQuestions(userId: string, step?: number): Promise<QuestionDto[]> {
    const questionnaires = await this.questionnaireRepository.getAllQuizzes(userId, step);
    return questionnaires.map(this.questionMapper.toDto);
  }

  public async getOneQuestion(questionId: string, userId: string): Promise<QuestionDto> {
    const question = await this.questionnaireRepository.getOneQuestion(questionId, userId);
    return this.questionMapper.toDto(question);
  }
}
