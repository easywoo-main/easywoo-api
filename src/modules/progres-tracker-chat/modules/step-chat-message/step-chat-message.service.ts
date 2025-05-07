import { Injectable } from '@nestjs/common';
import { StepChatMessageRepository } from './step-chat-message.repository';
import { CreateStepChatMessageDto } from './dtos/createStepChatMessage.dto';
import { ChatMessageService } from 'src/modules/chat-message/chat-message.service';

@Injectable()
export class StepChatMessageService {
  constructor(
    private readonly stepChatMessageRepository: StepChatMessageRepository,
    private readonly chatMessageService: ChatMessageService,
  ) {}

  public async createStepChatMessage(data: CreateStepChatMessageDto, userId: string) {
    const stepChatMessage = await this.stepChatMessageRepository.createStepChatMessage({ userId, ...data });
    const currentStep =  await this.chatMessageService.findChatMessageById(stepChatMessage.chatMessageId);
    return await this.chatMessageService.findChatMessageById(currentStep.nextMessageId);
  }

  public async getStepChatMessagesByUserId(userId: string) {
    return this.stepChatMessageRepository.getStepChatMessagesByUserId(userId);
  }
}