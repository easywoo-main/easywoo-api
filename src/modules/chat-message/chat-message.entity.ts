import { ApiProperty } from '@nestjs/swagger';
import { $Enums, ChatMessage, MessageType } from '@prisma/client';

export class ChatMessageEntity implements ChatMessage {
  id: string;
  name: string;
  type: $Enums.MessageType;
  files: string[];
  timeout: number;
  nextMessageId: string;
  createdAt: Date;
  updatedAt: Date;
}