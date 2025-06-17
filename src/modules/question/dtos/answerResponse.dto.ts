import { ApiProperty } from '@nestjs/swagger';


export class AnswerResponseDto {
  @ApiProperty({ description: 'The answer id' })
  id: string;
  @ApiProperty({ description: 'The answer to the question' })
  answer: string;

}