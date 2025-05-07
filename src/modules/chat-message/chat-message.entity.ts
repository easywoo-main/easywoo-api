import { ApiProperty } from '@nestjs/swagger';
import { $Enums, ChatMessage, MessageType } from '@prisma/client';

export class ChatMessageEntity implements ChatMessage {
  @ApiProperty({ description: 'Unique identifier of the chat message' })
  id: string;

  @ApiProperty({ description: 'Name of the chat message' })
  name: string;

  @ApiProperty({ description: 'Type of the message', enum: $Enums.MessageType })
  type: $Enums.MessageType;

  @ApiProperty({ description: 'List of file URLs associated with the message', type: [String] })
  files: string[];

  @ApiProperty({ description: 'Timeout duration for the message in seconds' })
  timeout: number;

  @ApiProperty({ description: 'ID of the next message in the sequence' })
  nextMessageId: string;

  @ApiProperty({ description: 'Indicates if the message is a checkpoint' })
  isCheckpoint: boolean;

  @ApiProperty({ description: 'Timestamp when the message was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the message was last updated' })
  updatedAt: Date;
}