import { ChatMessageEntity } from '../chat-message.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ChatMessageWithPropsDto } from './messageWithProps.dto';
import { StepChatMessageEntity } from '../../progres-tracker-chat/modules/step-chat-message/step-chat-message.entity';


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