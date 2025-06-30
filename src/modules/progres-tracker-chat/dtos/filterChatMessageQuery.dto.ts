import { FilterChatMessage } from '../../chat-message/dto/filterChatMessageQuery.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';


export class FilterChatMessageWithUserId extends FilterChatMessage{
  @ApiPropertyOptional({ description: 'ID of the user to filter chat messages by', format: 'uuid' })
  userId?: string;
}