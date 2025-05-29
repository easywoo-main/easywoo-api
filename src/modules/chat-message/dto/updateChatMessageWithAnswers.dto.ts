import { CreateChatMessageDto } from './createChatMessage.dto';
import { CreateMessageChoiceWithGoToStepDto } from '../../message-choice/dto/createMessageChoiceGoToStep.dto';
import { CreateChatMessageWithAnswersDto } from './createChatMessageWithAnswers.dto';

export type UpdateChatMessageWithAnswersDto = Partial<CreateChatMessageWithAnswersDto>;