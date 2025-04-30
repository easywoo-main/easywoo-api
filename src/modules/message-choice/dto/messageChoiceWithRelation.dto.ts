import { ApiProperty } from '@nestjs/swagger';
import { ChatMessageEntity } from '../../chat-message/chat-message.entity';
import { MessageChoiceEntity } from '../messageChoice.entity';

export class MessageChoiceWithRelationDto extends MessageChoiceEntity {
  @ApiProperty({ description: 'The next message related to this choice' })
  nextMessage: ChatMessageEntity;
}