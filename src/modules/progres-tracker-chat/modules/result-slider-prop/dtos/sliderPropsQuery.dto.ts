import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ChartFilter {
  @ApiPropertyOptional({ description: 'Start date for filtering results', type: String })
  @Type(() => Date)
  startDate?: Date;

  @ApiPropertyOptional({ description: 'End date for filtering results', type: String })
  @Type(() => Date)
  endDate?: Date;

  @ApiPropertyOptional({ description: 'Chat ID to filter slider props', type: String, format: 'uuid' })
  chatId: string;

  @ApiPropertyOptional({ description: 'Array of variable (slider prop) IDs to filter', type: 'array', items: { type: 'string', format: 'uuid' } })
  variables?: string[];

  @ApiPropertyOptional({ description: 'Flag to indicate if barometer chart is requested', type: Boolean, example: false })
  @Type(() => Boolean)
  isBarometer?: boolean;
}