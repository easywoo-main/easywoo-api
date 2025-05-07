import { Injectable } from '@nestjs/common';
import { StepChatMessageRepository } from './step-chat-message.repository';
import { CreateStepChatMessageDto } from './dtos/createStepChatMessage.dto';

@Injectable()
export class StepChatMessageService {
  constructor(private readonly stepChatMessageRepository: StepChatMessageRepository) {}

  public async createStepChatMessage(data: CreateStepChatMessageDto, userId: string) {
    return this.stepChatMessageRepository.createStepChatMessage({ userId, ...data });
  }

  public async getStepChatMessagesByUserId(userId: string) {
    return this.stepChatMessageRepository.getStepChatMessagesByUserId(userId);
  }
}