import { CreateChatMessageDto } from './createChatMessage.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';


export class UpdateChatMessageDto extends CreateChatMessageDto{
  @ApiPropertyOptional({
    description: 'Identifier of the next message',
    format: 'uuid',
  })
  nextMessageId: string;
}