import { ChatMessage, MessageType } from '@prisma/client';

export class ChatMessageEntity implements ChatMessage {
  id: string;
  name: string;
  type: MessageType;
  nextMessageId: string;
  createdAt: Date;
  updatedAt: Date;

}