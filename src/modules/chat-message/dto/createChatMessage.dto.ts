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
  timeouts: number[];
  type?: MessageType;
  stepId: number


  isCourseEnd: boolean;
  isOfferRestart: boolean;
  isAllowManualTime: boolean;
  isComment: boolean;
  isBarometer: boolean;
  isGraph: boolean;

  startingChatId?: string | null;
  chatId: string;
  sliderPropIds: string[];

  goToStep?: number;
  restartFrom?: number;
}
