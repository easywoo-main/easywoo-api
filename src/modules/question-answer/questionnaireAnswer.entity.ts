import { ApiProperty } from '@nestjs/swagger';
import { Answer } from '@prisma/client';

export class AnswerEntity implements Answer {
  id: string;
  name: string;
  answer: string;
  questionId: string;
  createdAt: Date;
  updatedAt: Date;
}
