import { ApiProperty } from '@nestjs/swagger';
import { QuestionEntity } from '../question.entity';
import { AnswerDto } from '../../question-answer/dtos/answer.dto';
import { AnswerEntity } from '../../question-answer/questionnaireAnswer.entity';

export class QuestionWithUserAnswerDto extends QuestionEntity {
  @ApiProperty({ description: 'List of answers', type: [AnswerDto] })
  answers: AnswerDto[];
}
