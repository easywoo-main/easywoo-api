import { ApiProperty } from '@nestjs/swagger';
import { ChoiceType } from '@prisma/client';

export class CreateMessageChoiceDto {
  @ApiProperty({ description: 'Name or content of the choice', example: 'Yes' })
  name: string;

  @ApiProperty({ description: 'Type of the choice', enum: ChoiceType, example: ChoiceType.SINGLE })
  type: ChoiceType;

  @ApiProperty({ description: 'Identifier of the previous message linked to this choice', format: 'uuid' })
  prevMessageId: string;
}
