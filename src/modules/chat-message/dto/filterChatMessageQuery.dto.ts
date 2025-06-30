import { PageRequest } from '../../../utils/page-request.utils';
import { ApiPropertyOptional } from '@nestjs/swagger';


export class FilterChatMessage extends PageRequest {
  @ApiPropertyOptional({ description: 'ID of the chat to filter messages by', format: 'uuid' })
  chatId?: string;
}