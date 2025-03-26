import { ApiProperty } from '@nestjs/swagger';

export class QuestionnaireQuery {
  @ApiProperty({
    description: 'Step in the quiz process',
    type: Number,
    example: 1,
  })
  step: number;
}
