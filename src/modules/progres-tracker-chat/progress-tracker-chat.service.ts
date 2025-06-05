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
//todo: Not yet implemented
@Injectable()
export class ProgressTrackerChatService {
  constructor(
    private readonly chatMessageService: ChatMessageService,
    // private readonly resultMessageChoiceService: ResultMessageChoiceService,
    // private readonly resultSliderPropService: ResultSliderPropService,
    // private readonly messageChoiceService: MessageChoiceService,
    // private readonly stepChatMessageService: StepChatMessageService,
    // private readonly userTextMessageAnswerService: UserTextMessageAnswerService
  ) {
  }

  public async getNextChatMessage(chatMessageId: string, createUserStepDto: CreateUserStepDto, userId: string){
    const nextMessageId = await this.saveStep(chatMessageId, createUserStepDto, userId);
    if(!nextMessageId) {
      throw new Success("Chat ended");
    }
    return this.chatMessageService.findChatMessagesWithPropsById(nextMessageId)
  }

  public async saveStep(chatMessageId: string, createUserStepDto: CreateUserStepDto, userId: string){
    const currencyChatMessage = await this.chatMessageService.findChatMessageWithRelationById(chatMessageId);
    //todo
    // await this.stepChatMessageService.createStepChatMessage(chatMessageId, userId);

    // if ([MessageType.CHALLENGE, MessageType.QUESTION_SINGLE].includes(currencyChatMessage.type as any)) {
    //   await this.resultMessageChoiceService.createResultMessageChoice(createUserStepDto.messageChoiceId, userId)
    //
    //   const messageChoice = await this.messageChoiceService.findMessageChoiceById(createUserStepDto.messageChoiceId);
    //   return messageChoice.nextMessageId;
    // }
    //
    // if (MessageType.QUESTION_SLIDERS === currencyChatMessage.type) {
    //   await this.resultSliderPropService.createManyResultSliderProp(createUserStepDto.sliderProps, userId)
    // }
    //
    // if (MessageType.QUESTION_TEXT_FIELD === currencyChatMessage.type) {
    //   await this.userTextMessageAnswerService.createTextMessageAnswer({
    //     chatMessageId,
    //     userId,
    //     answer: createUserStepDto.textAnswer,
    //   });
    // }

    return currencyChatMessage.nextMessageId

  }
}
