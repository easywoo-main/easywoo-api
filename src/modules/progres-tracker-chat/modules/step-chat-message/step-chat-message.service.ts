import { Injectable } from '@nestjs/common';
import { StepChatMessageRepository } from './step-chat-message.repository';
import { StepChatMessageDto } from './dtos/stepChatMessage.dto';
import { PageRequest } from '../../../../utils/page-request.utils';

@Injectable()
export class StepChatMessageService {
  constructor(
    private readonly stepChatMessageRepository: StepChatMessageRepository,
  ) {}

  public async createStepChatMessage(chatMessageId: string, userId: string) {
    return await this.stepChatMessageRepository.createStepChatMessage({ userId, chatMessageId });
  }

  public async getStepChatMessagesByChatMessageId(chatMessageId: string, pageRequest: PageRequest) {
    const [stepChatMessages, count] = await Promise.all([
      this.stepChatMessageRepository.getAllStepChatMessageByChatMessageId(chatMessageId, pageRequest),
      this.stepChatMessageRepository.getCountStepChatMessage(chatMessageId, pageRequest)
    ]);

    return pageRequest.toPageResponse<StepChatMessageDto>(stepChatMessages, count);
  }
}