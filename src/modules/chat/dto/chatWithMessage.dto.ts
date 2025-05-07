import { ChatEntity } from '../chat.entity';
import { ChatMessageEntity } from '../../chat-message/chat-message.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ChatMessageWithRelationsDto } from '../../chat-message/dto/messageWithRelations.dto';


export class ChatWithMessageDto extends ChatEntity {
  @ApiProperty({
    description: 'The starting message of the chat',
    type: ChatMessageWithRelationsDto,
  })
  startMessage: ChatMessageWithRelationsDto;
}