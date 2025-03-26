import { Injectable } from '@nestjs/common';
import { QuestionnaireRepository } from './questionnaire.repository';

@Injectable()
export class QuestionnaireService {
  constructor(private readonly questionnaireRepository: QuestionnaireRepository) {}

  public async getAllQuizzes(userId: string, step?: number) {
    const questionnaires = await this.questionnaireRepository.getAllQuizzes(userId, step);

    return questionnaires;
    // return questionnaires.map((questionnaire) => {
    //   const { ...rest } = questionnaire;
    //   return {
    //     ...rest,
    //     // userAnswer: userAnswers[0],
    //   };
    // });
  }
}
