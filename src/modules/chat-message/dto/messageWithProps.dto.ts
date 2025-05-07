import { ChatMessageEntity } from '../chat-message.entity';
import { MessageChoiceEntity } from '../../message-choice/messageChoice.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { MessageSliderEntity } from '../../message-slider/message-slider.entity';
import { InfoPopUpEntity } from '../../info-pop-up/info-pop-up.entity';


export class ChatMessageWithPropsDto extends ChatMessageEntity {
  @ApiPropertyOptional({
    description: 'Array of next possible message choices related to this message',
    type: [MessageChoiceEntity]
  })
  nextChoices?: MessageChoiceEntity[];

  @ApiPropertyOptional(
    {
      description: 'Array of Pop-up related to this message',
      type: [InfoPopUpEntity]
    }
  )
  infoPopUps: InfoPopUpEntity[];

  @ApiPropertyOptional({
    description: 'Props of Slider',
    type: [MessageSliderEntity]
  })
  sliderProps?: MessageSliderEntity[];
}