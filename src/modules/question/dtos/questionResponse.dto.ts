import { ApiProperty } from '@nestjs/swagger';
import { AnswerResponseDto } from './answerResponse.dto';


export class QuestionResponseDto {
  @ApiProperty({ description: 'The question ID' })
  id: string;
  @ApiProperty({ description: 'The question step number' })
  step: number;
  @ApiProperty({ description: 'The question text' })
  question: string;
  @ApiProperty({ description: 'The answer text', type: [AnswerResponseDto] })
  answers: AnswerResponseDto[];

}