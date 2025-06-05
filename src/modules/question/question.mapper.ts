import { QuestionDto } from './dtos/question.dto';
import { Answer, Question, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { QuestionResponseDto } from './dtos/questionResponse.dto';

@Injectable()
export class QuestionMapper {

  public toResponseDto(question: QuestionDto ): QuestionResponseDto {
    return {
      id: question.id,
      question: question.question,
      step: question.step,
      type: question.type,
      midStepText: question.midStepText,
      answers: question.answers.map((answer: Answer) => {
        return {
          id: answer.id,
          answer: answer.answer,
        };
      }),
    };
  }
}
