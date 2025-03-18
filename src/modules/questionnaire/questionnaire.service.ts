import { Injectable } from '@nestjs/common';
import { QuestionnaireRepository } from './questionnaire.repository';
import {QuestionnaireWithUserAnswerDto} from "./questionnaireWithUserAnswear.dto";
@Injectable()
export class QuestionnaireService {
  constructor(private readonly questionnaireRepository: QuestionnaireRepository) {}

  public async getAllQuizzes(userId: string, step?: number): Promise<QuestionnaireWithUserAnswerDto[]> {
    const questionnaires = await this.questionnaireRepository.getAllQuizzes(userId, step);

    return questionnaires.map((questionnaire) => {
      const { userAnswers, ...rest } = questionnaire;
      return {
        ...rest,
        userAnswer: userAnswers[0],
      };
    });
  }
}
