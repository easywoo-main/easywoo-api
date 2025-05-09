import { ApiProperty } from '@nestjs/swagger';
import { StepChatMessage } from '@prisma/client';

export class StepChatMessageEntity implements StepChatMessage {
  @ApiProperty({ description: 'Unique identifier of the step chat message' })
  id: string;

  @ApiProperty({ description: 'Identifier of the user associated with the step chat message', format: 'uuid' })
  userId: string;

  @ApiProperty({ description: 'Identifier of the chat message associated with the step', format: 'uuid' })
  chatMessageId: string;

  @ApiProperty({ description: 'Timestamp when the step chat message was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the step chat message was last updated' })
  updatedAt: Date;
}