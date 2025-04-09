import { ApiProperty } from '@nestjs/swagger';
import { QuestionDto } from './question.dto';

export class QuestionWithStepDto {
  @ApiProperty({ description: 'Total number of questions' })
  count: number;

  @ApiProperty({ description: 'Question details', type: [QuestionDto] })
  questions: QuestionDto[];
}
