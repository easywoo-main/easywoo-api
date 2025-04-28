import { MessageChoiceEntity } from "../messageChoice.entity";
import { ChatMessageEntity } from '../../chat-message/chat-message.entity';

export class MessageChoiceWithRelationDto extends MessageChoiceEntity {
  nextMessage: ChatMessageEntity;
}