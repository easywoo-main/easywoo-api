import { AnswerEntity } from '../questionnaireAnswer.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AnswerDto extends AnswerEntity {
  @ApiProperty({ description: 'Indicates if the question is answered' })
  isAnswered: boolean;
}
