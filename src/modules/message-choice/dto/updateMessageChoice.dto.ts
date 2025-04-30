import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateMessageChoiceWithRelationDto } from './createMessageChoiceWithRelation.dto';

export class UpdateMessageChoiceDto extends CreateMessageChoiceWithRelationDto {
  @ApiPropertyOptional({
    description: 'Identifier of the next message linked to this choice',
    format: 'uuid',
  })
  nextMessageId: string;
}