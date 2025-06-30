import { Injectable } from '@nestjs/common';
import { StepChatMessageRepository } from './step-chat-message.repository';
import { CreateStepChatMessageDto } from './dtos/createStepChatMessage.dto';
import { FilterChatMessageWithUserId } from '../../dtos/filterChatMessageQuery.dto';
import { StepChatMessageDto } from './dtos/stepChatMessage.dto';

@Injectable()
export class StepChatMessageService {
  constructor(
    private readonly stepChatMessageRepository: StepChatMessageRepository,
  ) {}

  public async createStepChatMessage(createStepChatMessageDto: CreateStepChatMessageDto) {
    return await this.stepChatMessageRepository.createStepChatMessage(createStepChatMessageDto);
  }

  public async getChatMessageHistory(filterChatMessageWithUserId: FilterChatMessageWithUserId)  {
    const [chatMessages, count] = await Promise.all([
      this.stepChatMessageRepository.findMessagesWithoutNextId(filterChatMessageWithUserId),
      this.stepChatMessageRepository.countMessagesWithoutNextId(filterChatMessageWithUserId)
    ]);

    return filterChatMessageWithUserId.toPageResponse(chatMessages, count);
  }
}