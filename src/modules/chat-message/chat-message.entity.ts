import { ApiProperty } from '@nestjs/swagger';
import { ChatMessage, MessageType } from '@prisma/client';

export class ChatMessageEntity implements ChatMessage {
  @ApiProperty({ description: 'Unique identifier of the chat message', format: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Name of the chat message' })
  name: string;

  @ApiProperty({ description: 'Type of the message', enum: MessageType })
  type: MessageType;

  @ApiProperty({ description: 'ID of the next message in the sequence', nullable: true })
  nextMessageId: string;

  @ApiProperty({ description: 'Timestamp when the message was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the message was last updated' })
  updatedAt: Date;
}