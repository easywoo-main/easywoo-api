import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageChoiceDto {
  @ApiProperty({ description: 'Name or content of the choice', example: 'Yes' })
  name: string;

  @ApiProperty({ description: 'Identifier of the previous message linked to this choice', format: 'uuid' })
  prevMessageId: string;
}
