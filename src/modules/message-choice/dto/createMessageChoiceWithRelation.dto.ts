import { ApiProperty } from '@nestjs/swagger';
import { CreateMessageChoiceDto } from './createMessageChoice.dto';

export class CreateMessageChoiceWithRelationDto extends CreateMessageChoiceDto {
  @ApiProperty({ description: 'Identifier of the previous message linked to this choice', format: 'uuid' })
  prevMessageId: string;
}

