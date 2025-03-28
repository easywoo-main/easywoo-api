import { ApiProperty } from '@nestjs/swagger';
import { Question, QuestionsType } from '@prisma/client';

export class QuestionnaireEntity implements Question {
  @ApiProperty({ description: 'Unique identifier of the questionnaire' })
  id: string;

  @ApiProperty({ description: 'Step number in the questionnaire' })
  step: number;

  @ApiProperty({ description: 'Name of the questionnaire' })
  name: string;

  @ApiProperty({ description: 'Question text' })
  question: string;

  // @ApiProperty({ description: 'List of possible answers for the question' })
  // answers: string[];

  @ApiProperty({ description: 'The type of the question' })
  type: QuestionsType;

  @ApiProperty({ description: 'Timestamp when the questionnaire was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the questionnaire was last updated' })
  updatedAt: Date;
}
