import { CreateChatMessageDto } from './createChatMessage.dto';
import { CreateMessageChoiceWithGoToStepDto } from '../../message-choice/dto/createMessageChoiceGoToStep.dto';

export class CreateChatMessageWithAnswersDto extends CreateChatMessageDto {
  answers?: CreateMessageChoiceWithGoToStepDto[];
  goToStep: number;
}
