import { QuestionDto } from './dtos/question.dto';
import { Answer, Question, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionMapper {
  public toDto(question: Question & { answers: (Answer & { users: User[] })[] }): QuestionDto {
    return {
      ...question,
      answers: question.answers.map(({ users, ...answer }) => {
        return {
          isAnswered: !!users[0],
          ...answer,
        };
      }),
    };
  }
}
