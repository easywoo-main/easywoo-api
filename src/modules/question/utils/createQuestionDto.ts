import { QuestionnaireDto } from '../dtos/questionnaire.dto';
import { Question } from '@prisma/client';

function createQuestionnaireDto(questions: Question[]): QuestionnaireDto {
  const dto: QuestionnaireDto = {};

  questions.forEach((question) => {
    const questionName = question.name;
    //
    // if (question.answers && question.answers.length > 0) {
    //     dto[questionName] = {};
    //
    //     question.answers.forEach(answer => {
    //         dto[questionName][answer.name] = false; // Встановлюємо значення для кожної відповіді
    //     });
    // }
  });

  return dto;
}
