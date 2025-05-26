import { CreateChatMessageDto } from './createChatMessage.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateMessageChoiceWithRelationDto } from '../../message-choice/dto/createMessageChoiceWithRelation.dto';


export type UpdateChatMessageDto = Partial<CreateChatMessageDto>