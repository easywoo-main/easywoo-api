import { QuestionnaireEntity } from './questionnaire.entity';
import { QuestionnaireAnswerEntity } from '../questionnaire-answer/questionnaireAnswer.entity';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionnaireWithUserAnswerDto extends QuestionnaireEntity {
  @ApiProperty({ description: 'User answer for the question' })
  userAnswer: QuestionnaireAnswerEntity;
}
