import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateMessageChoiceWithRelationDto } from './createMessageChoiceWithRelation.dto';

export type UpdateMessageChoiceDto = Partial<CreateMessageChoiceWithRelationDto>
