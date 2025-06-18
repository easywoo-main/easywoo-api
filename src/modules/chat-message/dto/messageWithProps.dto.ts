import { ChatMessageEntity } from '../chat-message.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ChatMessageWithChoicesDto } from './messageWithChoices.dto';
import { StepChatMessageEntity } from '../../progres-tracker-chat/modules/step-chat-message/step-chat-message.entity';
import { MessageChoiceEntity } from '../../message-choice/messageChoice.entity';
import { SliderPropEntity } from '../../slider-prop/sliderProp.entity';


export class ChatMessageWithRelationsDto extends ChatMessageWithChoicesDto {
  @ApiPropertyOptional({ type: () => [SliderPropEntity], description: 'Slider properties related to the chat message' })
  sliderProps?: SliderPropEntity[];
}
