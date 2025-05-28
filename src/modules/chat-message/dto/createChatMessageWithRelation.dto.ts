import { CreateMessageChoiceWithRelationDto } from '../../message-choice/dto/createMessageChoiceWithRelation.dto';
import { CreateChatMessageWithAnswersDto } from './createChatMessageWithAnswers.dto';
import { CreateChatMessageDto } from './createChatMessage.dto';


export class CreateChatMessageWithRelationDto extends CreateChatMessageDto{
  nextMessageId?: string | null;
  answers?: CreateMessageChoiceWithRelationDto[] = [];
}
