import { QuestionnaireAnswer } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionnaireAnswerEntity implements QuestionnaireAnswer {
  @ApiProperty({
    description: 'Unique identifier for the answer',
    example: 'b3f5c1c6-e2d1-4db7-b06f-0bfa6ad2ac9b',
  })
  id: string;

  @ApiProperty({
    description: 'The answer provided by the user, could be an array of strings',
  })
  answerId: string;


  @ApiProperty({
    description: 'Unique identifier of the associated question',
    example: 'f0a2e3d4-45f5-4c62-b6b7-4a9fe90b8d09',
  })
  questionId: string;

  @ApiProperty({
    description: 'Unique identifier of the user who answered the question',
    example: 'a3cfa5d9-2a65-4a5e-97cf-bf2b97fc9db3',
  })
  userId: string;

  @ApiProperty({
    description: 'Timestamp when the answer was created',
    example: '2023-03-18T12:34:56Z',
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the answer was last updated',
    example: '2023-03-18T12:34:56Z',
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
}
