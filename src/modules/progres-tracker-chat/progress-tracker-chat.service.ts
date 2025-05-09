import { Body, Injectable, Param, Post } from '@nestjs/common';
import { CreateUserStepDto } from '../chat-message/dto/createUserStep.dto';
import { ChatMessageService } from '../chat-message/chat-message.service';
import { MessageType } from '@prisma/client';
import { ResultMessageChoiceService } from './modules/result-message-choice/result-message-choice.service';
import { CreateResultMessageChoiceDto } from './modules/result-message-choice/dtos/createResultMessageChoice.dto';
import { ResultSliderPropService } from './modules/result-slider-prop/result-slider-prop.service';
import { Success } from '../../utils/success.utils';
import { MessageChoiceService } from '../message-choice/message-choice.service';
import { StepChatMessageService } from './modules/step-chat-message/step-chat-message.service';

@Injectable()
export class ProgressTrackerChatService {
  constructor(
    private readonly chatMessageService: ChatMessageService,
    private readonly resultMessageChoiceService: ResultMessageChoiceService,
    private readonly resultSliderPropService: ResultSliderPropService,
    private readonly messageChoiceService: MessageChoiceService,
    private readonly stepChatMessageService: StepChatMessageService
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

    await this.stepChatMessageService.createStepChatMessage(chatMessageId, userId);

    if ([MessageType.CHALLENGE, MessageType.QUESTION_SINGLE].includes(currencyChatMessage.type as any)) {
      await this.resultMessageChoiceService.createResultMessageChoice(createUserStepDto.messageChoiceId, userId)

      const messageChoice = await this.messageChoiceService.findMessageChoiceById(createUserStepDto.messageChoiceId);
      return messageChoice.nextMessageId;
    }

    if (MessageType.QUESTION_SLIDERS === currencyChatMessage.type) {
      await this.resultSliderPropService.createManyResultSliderProp(createUserStepDto.sliderProps, userId, chatMessageId)
    }

    if (MessageType.QUESTION_TEXT_FIELD === currencyChatMessage.type) {
      //todo save
    }

    return currencyChatMessage.nextMessageId

  }
}
