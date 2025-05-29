import { MessageChoiceEntity } from '../messageChoice.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ChatMessageEntity } from '../../chat-message/chat-message.entity';

export class MessageChoiceWithRelation extends MessageChoiceEntity{
  @ApiPropertyOptional({
    description: 'The next message related to this message',
  })
  nextMessage?: ChatMessageEntity;
}