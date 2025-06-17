import { ApiProperty } from '@nestjs/swagger';


export class CreateResultMessageChoiceDto {
  @ApiProperty({ description: 'Identifier of the message choice', format: 'uuid' })
  messageChoiceId: string;
}