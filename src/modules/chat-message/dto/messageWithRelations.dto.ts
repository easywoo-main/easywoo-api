import { ChatMessageEntity } from '../chat-message.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ChatMessageWithPropsDto } from './messageWithProps.dto';


export class ChatMessageWithRelationsDto extends ChatMessageWithPropsDto {
  @ApiPropertyOptional({
    description: 'The next message related to this message',
  })
  nextMessage?: ChatMessageEntity;
}