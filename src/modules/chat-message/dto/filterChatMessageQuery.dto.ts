import { PageRequest } from '../../../utils/page-request.utils';


export class FilterChatMessage extends PageRequest{
  chatMessageId?: string;
  chatId?: string;
  messageChoiceId?: string
}