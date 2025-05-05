import { ApiProperty } from '@nestjs/swagger';
import { Answer } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

export class AnswerEntity implements Answer {
  @ApiProperty({ description: 'Unique identifier for the answer', format: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Name of the answer' })
  name: string;

  @ApiProperty({ description: 'Answer text' })
  answer: string;

  @ApiProperty({ description: 'easywoo name' })
  easywooName: string

  @ApiProperty({ description: 'ID of the related question', format: 'uuid' })
  questionId: string;

  @ApiProperty({ description: 'Evaluation data in JSON format' })
  evaluation: JsonValue;

  @ApiProperty({ description: 'Date when the answer was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the answer was last updated' })
  updatedAt: Date;
}
