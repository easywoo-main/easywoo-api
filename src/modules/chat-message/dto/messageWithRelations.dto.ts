import { ChatMessageEntity } from '../chat-message.entity';
import { MessageChoiceEntity } from '../../message-choice/messageChoice.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { MessageSliderEntity } from '../../message-slider/message-slider.entity';


export class ChatMessageWithRelationsDto extends ChatMessageEntity {
  @ApiPropertyOptional({
    description: 'Array of next possible message choices related to this message',
    type: [MessageChoiceEntity],
  })
  nextChoices?: MessageChoiceEntity[]

  @ApiPropertyOptional({
    description: 'The next message related to this message',
  })
  nextMessage?: ChatMessageEntity;


  @ApiPropertyOptional({
    description: 'Props of Slider',
    type: [MessageSliderEntity],
  })
  sliderProps?: MessageSliderEntity[]
}