import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionRepository } from './question.repository';
import { QuestionDto } from './dtos/question.dto';
import { QuestionMapper } from './question.mapper';
import { QuestionWithStepDto } from './dtos/questionWithStep.dto';
import { QuestionResponseDto } from './dtos/questionResponse.dto';

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionnaireRepository: QuestionRepository,
    private readonly questionMapper: QuestionMapper
  ) {
  }

  public async getAllQuestions(userId: string, step?: number): Promise<QuestionDto[]> {
    const questionnaires = await this.questionnaireRepository.getAllQuestionsByStep(userId, step);
    return questionnaires.map(this.questionMapper.toDto);
  }

  public async getOneQuestion(questionId: string, userId: string): Promise<QuestionDto> {
    const question = await this.questionnaireRepository.getOneQuestion(questionId, userId);
    return this.questionMapper.toDto(question);
  }

  public async getQuestionByStep(step: number): Promise<QuestionResponseDto[]> {
    const questions = await this.questionnaireRepository.getAllQuestions(step);
    return questions.map(this.questionMapper.toResponseDto)
  }
}
