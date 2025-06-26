import { Injectable } from '@nestjs/common';
import { CreateUserStepDto } from '../chat-message/dto/createUserStep.dto';
import { ChatMessageService } from '../chat-message/chat-message.service';
import { ResultMessageChoiceService } from './modules/result-message-choice/result-message-choice.service';
import { ResultSliderPropService } from './modules/result-slider-prop/result-slider-prop.service';
import { Success } from '../../utils/success.utils';
import { MessageChoiceService } from '../message-choice/message-choice.service';
import { StepChatMessageService } from './modules/step-chat-message/step-chat-message.service';
import { UserTextMessageAnswerService } from './modules/user-text-message-answer/user-text-message-answer.service';
import { MessageType } from '@prisma/client';
import { CreateAnswerDto } from '../chat-message/dto/createUserAnswer.dto';
import { SubscriptionService } from '../subscription/subscription.service';
@Injectable()
export class ProgressTrackerChatService {
  constructor(
    private readonly chatMessageService: ChatMessageService,
    private readonly resultMessageChoiceService: ResultMessageChoiceService,
    private readonly resultSliderPropService: ResultSliderPropService,
    private readonly stepChatMessageService: StepChatMessageService,
    private readonly userTextMessageAnswerService: UserTextMessageAnswerService,
    private readonly subscriptionService: SubscriptionService,
  ) {
  }

  public async createUserAnswerAndGetNextMessage(createAnswerDto: CreateUserStepDto, userId: string){
    const chatMessage = await this.chatMessageService.findChatMessageWithRelationById(createAnswerDto.chatMessageId);

    await this.subscriptionService.checkExists(chatMessage.chatId, userId);

    let nextChatMessageId: string = chatMessage.nextMessageId;


    if (createAnswerDto.messageChoiceId && chatMessage?.nextChoices?.length > 0){
      const messageChoice = chatMessage.nextChoices.find((item)=>item.id === createAnswerDto.messageChoiceId);
      await this.resultMessageChoiceService.createResultMessageChoice(messageChoice.id, userId)
      nextChatMessageId = messageChoice.nextMessageId;



    } else if (createAnswerDto.textAnswer) {
      await this.userTextMessageAnswerService.createTextMessageAnswer({chatMessageId: chatMessage.id, answer: createAnswerDto.textAnswer}, userId)


    } else if (createAnswerDto.sliderProps) {
      await this.resultSliderPropService.createManyResultSliderProp(createAnswerDto.sliderProps, userId);


    } else if (chatMessage.nextMessageId) {
      await this.stepChatMessageService.createStepChatMessage(chatMessage.id, userId);
    }

    if (createAnswerDto.restartMessageId) {
      return this.chatMessageService.findChatMessagesWithPropsById(createAnswerDto.restartMessageId);
    }

    if (chatMessage.isCourseEnd || !nextChatMessageId){
      return new Success("Chat ended")
    }
    return this.chatMessageService.findChatMessagesWithPropsById(nextChatMessageId);
  }
}
