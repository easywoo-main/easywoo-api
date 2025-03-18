import { Questionnaire } from './questionnaire.entity';
import { QuestionnaireAnswer } from '../questionnaire-answer/questionnaireAnswer.entity';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionnaireWithUserAnswerDto extends Questionnaire {
  @ApiProperty({ description: 'User answer for the question' })
  userAnswer: QuestionnaireAnswer;
}
