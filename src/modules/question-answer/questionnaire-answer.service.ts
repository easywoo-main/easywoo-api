import { Injectable } from '@nestjs/common';
import { QuestionnaireAnswerRepository } from './questionnaireAnswer.repository';
import { QuestionnaireAnswerCreateDto } from './dtos/questionnaireAnswerCreate.dto';
import { QuestionService } from '../question/question.service';
import { AnswerDto } from './dtos/answer.dto';

@Injectable()
export class QuestionnaireAnswerService {
  constructor(
    private readonly questionnaireAnswerRepository: QuestionnaireAnswerRepository,
    private readonly questionnaireService: QuestionService,
  ) {
  }

  public async getQuestionnaireAnswer(questionnaireAnswerCreateDto: QuestionnaireAnswerCreateDto) {
    const question = await this.questionnaireService.getOneQuestion(questionnaireAnswerCreateDto.questionId);
    const notSelectedAnswerIds = question.answers.map((answer) => answer.id).filter((id) => !questionnaireAnswerCreateDto.answerIds.includes(id));


    const notSelectedAnswer = await Promise.all(
      notSelectedAnswerIds.map(
        async (answerId): Promise<AnswerDto> => {
          return {
            ...await this.questionnaireAnswerRepository.findAnswerById(answerId),
            isAnswered: false
          };
        })
    );

    const selectedAnswer = await Promise.all(
      questionnaireAnswerCreateDto.answerIds.map(
        async (answerId): Promise<AnswerDto> => {
          return {
            ...await this.questionnaireAnswerRepository.findAnswerById(answerId),
            isAnswered: true
          };
        })
    );

    return {
      ...await this.questionnaireService.getOneQuestion(questionnaireAnswerCreateDto.questionId),
      answers: [...notSelectedAnswer, ...selectedAnswer]
    };
  }
}
