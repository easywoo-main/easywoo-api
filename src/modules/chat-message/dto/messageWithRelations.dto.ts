import { ChatMessageEntity } from '../chat-message.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ChatMessageWithPropsDto } from './messageWithProps.dto';
import { StepChatMessageEntity } from '../stepChatMessage.entity';


export class ChatMessageWithRelationsDto extends ChatMessageWithPropsDto {
  @ApiPropertyOptional({
    description: 'The next message related to this message',
  })
  nextMessage?: ChatMessageEntity;

  @ApiPropertyOptional({
    description: 'The user step',
  })
  stepChatMessages?: StepChatMessageEntity[];
}