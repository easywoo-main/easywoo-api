import { ChatEntity } from '../chat.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ChatMessageWithRelationsDto } from '../../chat-message/dto/messageWithProps.dto';


export class ChatWithMessageDto extends ChatEntity {
  @ApiProperty({
    description: 'The starting message of the chat',
    type: ChatMessageWithRelationsDto,
  })
  startMessage: ChatMessageWithRelationsDto;
}