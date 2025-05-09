import { Injectable } from '@nestjs/common';
import { StepChatMessageRepository } from './step-chat-message.repository';

@Injectable()
export class StepChatMessageService {
  constructor(
    private readonly stepChatMessageRepository: StepChatMessageRepository,
  ) {}

  public async createStepChatMessage(chatMessageId: string, userId: string) {
    return await this.stepChatMessageRepository.createStepChatMessage({ userId, chatMessageId });
  }

  public async getStepChatMessagesByUserId(userId: string) {
    return this.stepChatMessageRepository.getStepChatMessagesByUserId(userId);
  }
}