import { ApiProperty } from '@nestjs/swagger';
import { CreateChatDto } from './createChat.dto';
import { CreateUpdateSliderPropDto } from '../../chat-message/dto/createUpdateSliderProp.dto';

export class UpdateChatDto extends CreateChatDto {
  @ApiProperty({ description: 'The ID of the start message', format: 'uuid' })
  startMessageId: string;

}