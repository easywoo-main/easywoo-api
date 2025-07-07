import { PageRequest } from '../../../utils/page-request.utils';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class FilterChatMessage extends PageRequest {
  @ApiPropertyOptional({ description: 'ID of the chat to filter messages by', format: 'uuid' })
  chatId: string;

  @ApiProperty({
    description: 'Sorting criteria in the format { field: "asc" | "desc" }',
    example: { updatedAt: 'asc' },
    required: false,
  })
  sortBy?: Record<string, 'desc' | 'asc'> = { updatedAt: 'asc' };

  @ApiPropertyOptional({ description: 'Start date to filter messages from', type: String, format: 'date-time' })
  startDate?: Date;

  @ApiPropertyOptional({ description: 'End date to filter messages to', type: String, format: 'date-time' })
  endDate?: Date;
}