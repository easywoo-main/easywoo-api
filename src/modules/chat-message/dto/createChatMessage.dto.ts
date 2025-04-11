import { MessageType } from '@prisma/client';


export class CreateMessageDto {
  parentId: string;
  name: string;
  type: MessageType;
}