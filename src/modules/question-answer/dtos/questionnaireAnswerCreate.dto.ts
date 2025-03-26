import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class QuestionnaireAnswerCreateDto {
  @ApiProperty({
    description: 'The answer provided by the user, could be an array of strings',
    type: [String],
    example: ['Answer 1', 'Answer 2'],
  })
  @ApiProperty({
    description: 'Unique identifier of the associated question',
    example: 'f0a2e3d4-45f5-4c62-b6b7-4a9fe90b8d09',
  })
  questionId: string;

  // @ApiProperty({
  //   description: 'Unique identifier of the user who answered the question',
  //   example: 'a3cfa5d9-2a65-4a5e-97cf-bf2b97fc9db3',
  // })
  // userId: string;
}
