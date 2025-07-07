import { Injectable } from '@nestjs/common';
import { CreateUserStepDto } from '../chat-message/dto/createUserStep.dto';
import { ChatMessageService } from '../chat-message/chat-message.service';
import { ResultSliderPropService } from './modules/result-slider-prop/result-slider-prop.service';
import { Success } from '../../utils/success.utils';
import { StepChatMessageService } from './modules/step-chat-message/step-chat-message.service';
import { SubscriptionService } from '../subscription/subscription.service';
import { CreateStepChatMessageDto } from './modules/step-chat-message/dtos/createStepChatMessage.dto';
import { FilterChatMessage } from '../chat-message/dto/filterChatMessageQuery.dto';
import { FilterChatMessageWithUserId } from './dtos/filterChatMessageQuery.dto';
import { ChatMessageWithChoicesDto } from '../chat-message/dto/messageWithChoices.dto';

@Injectable()
export class ProgressTrackerChatService {
  constructor(private readonly chatMessageService: ChatMessageService,
              private readonly resultSliderPropService: ResultSliderPropService,
              private readonly stepChatMessageService: StepChatMessageService,
              private readonly subscriptionService: SubscriptionService,
  ) {
  }

  public async createUserAnswerAndGetNextMessage(createAnswerDto: CreateUserStepDto, userId: string) {
    const chatMessage = await this.chatMessageService.findChatMessageWithRelationById(createAnswerDto.chatMessageId);

    await this.subscriptionService.checkExists(chatMessage.chatId, userId);


    const createStepChatMessage: CreateStepChatMessageDto = {
      userId,
      chatId: chatMessage.chatId,
      chatMessageId: chatMessage.id,
      answer: createAnswerDto.textAnswer,
      challengeTime: createAnswerDto.challengeTime,
      timeSpent: createAnswerDto.timeSpent,
      nextChatMessageId: createAnswerDto.restartMessageId || chatMessage.nextMessageId,
    };

    if (createAnswerDto.messageChoiceId && chatMessage?.nextChoices?.length > 0) {
      const messageChoice = chatMessage.nextChoices.find((item) => item.id === createAnswerDto.messageChoiceId);
      createAnswerDto.messageChoiceId = messageChoice.id;
      createStepChatMessage.nextChatMessageId = messageChoice.nextMessageId;
    }

    const stepChatMessage = await this.stepChatMessageService.createStepChatMessage(createStepChatMessage);
    if (createAnswerDto.sliderProps) {
      await this.resultSliderPropService.createManyResultSliderProp(createAnswerDto.sliderProps, userId, stepChatMessage.id);
    }

    if (chatMessage.isCourseEnd || !stepChatMessage.nextChatMessageId) {
      return new Success('Chat ended');
    }
    return this.chatMessageService.findChatMessagesWithPropsById(stepChatMessage.nextChatMessageId);
  }

  public async getChatMessageHistory(filterChatMessage: FilterChatMessage, userId: string) {
    const filterChatMessageWithUserId: FilterChatMessageWithUserId = filterChatMessage
    filterChatMessageWithUserId.userId = userId
    return this.stepChatMessageService.getChatMessageHistory(filterChatMessageWithUserId);
  }

  public async findCurrentChatMessage(chatId: string, userId: string): Promise<ChatMessageWithChoicesDto> {
    await this.subscriptionService.checkExists(chatId, userId);
    const lastStepChatMessage = await  this.stepChatMessageService.findStepChatMessageById(chatId, userId);
    return this.chatMessageService.findChatMessagesWithPropsById(lastStepChatMessage.nextChatMessageId);

  }
}
