import { MessageType } from '@prisma/client';

export class CreateChatMessageDto {
  stepName: string;
  introText: string;
  introImage: string[];
  introMedia: string[];
  question: string;
  todoList: string[];
  image: string[];
  media: string[];
  timeout?: number;
  type?: MessageType;


  isCourseEnd: boolean;
  isOfferRestart: boolean;
  isAllowManualTime: boolean;
  isComment: boolean;
  isBarometer: boolean;

  nextMessageId?: string | null;
  chatId: string;
  startingChatId?: string;

  sliderPropIds?: string[] = [];
  prevMessageIds?: string[] = [];
  prevChoiceIds?: string[] = [];
}
