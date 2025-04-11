import { ApiProperty } from '@nestjs/swagger';
import { ChoiceType, MessageChoice } from '@prisma/client';

export class MessageChoiceEntity implements MessageChoice {
  @ApiProperty({ description: 'Unique identifier of the message choice', format: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Content or name of the message choice', example: 'Accept' })
  name: string;

  @ApiProperty({ description: 'Type of the message choice', enum: ChoiceType, example: ChoiceType.SINGLE })
  type: ChoiceType;

  @ApiProperty({ description: 'Identifier of the previous message linked to this choice', format: 'uuid' })
  prevMessageId: string;

  @ApiProperty({ description: 'Identifier of the next message linked to this choice', format: 'uuid', required: false })
  nextMessageId: string;

  @ApiProperty({ description: 'Timestamp when the message choice was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the message choice was last updated' })
  updatedAt: Date;
}
