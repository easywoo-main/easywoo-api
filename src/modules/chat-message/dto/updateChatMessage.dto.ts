import { CreateChatMessageDto } from './createChatMessage.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateMessageChoiceWithRelationDto } from '../../message-choice/dto/createMessageChoiceWithRelation.dto';


export class UpdateChatMessageDto extends CreateChatMessageDto{
  @ApiPropertyOptional({
    description: 'Identifier of the next message',
    format: 'uuid',
  })
  nextMessageId: string;
}