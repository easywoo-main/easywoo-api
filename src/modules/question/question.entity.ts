import { ApiProperty } from '@nestjs/swagger';
import { Question, QuestionsType } from '@prisma/client';

export class QuestionEntity implements Question {
  @ApiProperty({ description: 'Unique identifier of the questionnaire', format: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Step number in the questionnaire' })
  step: number;

  @ApiProperty({ description: 'Name of the questionnaire' })
  name: string;

  @ApiProperty({ description: 'Question text' })
  question: string;

  @ApiProperty({ description: 'The type of the question', enum: QuestionsType })
  type: QuestionsType;

  @ApiProperty({description: "The text"})
  midStepText: string

  @ApiProperty({description: "The name of easywooApi"})
  easywooName: string

  @ApiProperty({ description: 'Timestamp when the questionnaire was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the questionnaire was last updated' })
  updatedAt: Date;
}
