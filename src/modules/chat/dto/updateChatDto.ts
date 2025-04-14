import { CreateChatDto } from './createChat.dto';

export class UpdateChatDto extends CreateChatDto {
  startMessageId: string;
}