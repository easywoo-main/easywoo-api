import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionRepository } from './question.repository';
import { QuestionDto } from './dtos/question.dto';
import { QuestionMapper } from './question.mapper';
import { QuestionWithStepDto } from './dtos/questionWithStep.dto';

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionnaireRepository: QuestionRepository,
    private readonly questionMapper: QuestionMapper,
  ) {}

  public async getAllQuestions(userId: string): Promise<QuestionDto[]> {
    const questionnaires = await this.questionnaireRepository.getAllQuizzes(userId);
    return questionnaires.map(this.questionMapper.toDto);
  }

  public async getOneQuestion(questionId: string, userId: string): Promise<QuestionDto> {
    const question = await this.questionnaireRepository.getOneQuestion(questionId, userId);
    return this.questionMapper.toDto(question);
  }

  public async getQuestionByStep(userId: string, step: number) {
    const questions = await this.getAllQuestions(userId);

    const existingQuestion = new QuestionWithStepDto();
    existingQuestion.count = questions.length;
    if (step > questions.length) {
      throw new BadRequestException('Step is greater than the number of questions');
    }
    step--;
    existingQuestion.question = questions[step];
    return existingQuestion;
  }
}
