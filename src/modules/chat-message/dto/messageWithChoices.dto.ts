import { ChatMessageEntity } from '../chat-message.entity';
import { MessageChoiceEntity } from '../../message-choice/messageChoice.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { MessageChoiceWithRelation } from '../../message-choice/dto/messageChoiceWithRelation.dto';


export class ChatMessageWithChoicesDto extends ChatMessageEntity {
  @ApiPropertyOptional({
    description: 'Array of next possible message choices related to this message',
    type: [MessageChoiceWithRelation]
  })
  nextChoices?: MessageChoiceWithRelation[];
}