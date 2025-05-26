import { ChatMessageEntity } from '../chat-message.entity';
import { MessageChoiceEntity } from '../../message-choice/messageChoice.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';


export class ChatMessageWithPropsDto extends ChatMessageEntity {
  @ApiPropertyOptional({
    description: 'Array of next possible message choices related to this message',
    type: [MessageChoiceEntity]
  })
  nextChoices?: MessageChoiceEntity[];
}