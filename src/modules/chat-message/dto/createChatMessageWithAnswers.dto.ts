import { CreateChatMessageDto } from './createChatMessage.dto';
import { CreateMessageChoiceDto } from '../../message-choice/dto/createMessageChoice.dto';

export class CreateChatMessageWithAnswersDto extends CreateChatMessageDto {
  answers?: CreateMessageChoiceDto[];
}
