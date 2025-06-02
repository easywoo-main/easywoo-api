import { ChatMessageEntity } from '../chat-message.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ChatMessageWithPropsDto } from './messageWithProps.dto';
import { StepChatMessageEntity } from '../../progres-tracker-chat/modules/step-chat-message/step-chat-message.entity';
import { MessageChoiceEntity } from '../../message-choice/messageChoice.entity';
import { SliderPropEntity } from '../../slider-prop/sliderProp.entity';


export class ChatMessageWithRelationsDto extends ChatMessageWithPropsDto {
  @ApiPropertyOptional({
    description: 'The next message related to this message',
  })
  nextMessage?: ChatMessageEntity;

  sliderProps?: SliderPropEntity[];
}