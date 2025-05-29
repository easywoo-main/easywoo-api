import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateMessageChoiceDto } from './createMessageChoice.dto';

export class CreateMessageChoiceWithRelationDto extends CreateMessageChoiceDto {
  @ApiPropertyOptional({
    description: 'Identifier of the next message linked to this choice',
    format: 'uuid',
  })
  nextMessageId?: string;
  prevMessageId?: string;
}

