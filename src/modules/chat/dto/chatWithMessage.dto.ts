import { ChatEntity } from '../chat.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ChatMessageWithRelationsDto } from '../../chat-message/dto/messageWithRelations.dto';
import { MessageSliderEntity } from '../../message-slider/message-slider.entity';


export class ChatWithMessageDto extends ChatEntity {
  @ApiProperty({
    description: 'The starting message of the chat',
    type: ChatMessageWithRelationsDto,
  })
  startMessage: ChatMessageWithRelationsDto;

  @ApiPropertyOptional({
    description: 'Props of Slider',
    type: [MessageSliderEntity]
  })
  sliderProps?: MessageSliderEntity[];
}