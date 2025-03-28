import { ApiProperty } from '@nestjs/swagger';
import { Answer } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

export class AnswerEntity implements Answer {
  id: string;
  name: string;
    answer: string;
    questionId: string;
    evaluation: JsonValue;
    createdAt: Date;
    updatedAt: Date;
}
