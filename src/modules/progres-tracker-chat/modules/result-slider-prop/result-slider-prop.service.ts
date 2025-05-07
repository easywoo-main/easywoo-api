import { Injectable } from '@nestjs/common';
import { ResultSliderPropRepository } from './result-slider-prop.repository';
import { CreateResultSliderPropDto } from './dtos/createResultSliderProp.dto';
import { ChatMessageService } from 'src/modules/chat-message/chat-message.service';

@Injectable()
export class ResultSliderPropService {
  constructor(
    private readonly resultSliderPropRepository: ResultSliderPropRepository,
  private readonly chatMessageService: ChatMessageService) {}

  public async createResultSliderProp(data: CreateResultSliderPropDto, userId: string) {
    return this.resultSliderPropRepository.createResultSliderProp({userId, ...data});
  }

  public async createManyResultSliderProp(data: CreateResultSliderPropDto[], userId: string, chatMessageId: string) {
    await this.resultSliderPropRepository.createManyResultSliderProp(data.map((item) => ({userId, ...item})));
    const currentStep =  await this.chatMessageService.findChatMessageById(chatMessageId);
    return await this.chatMessageService.findChatMessageById(currentStep.nextMessageId);  }

  public async getResultSliderPropsByUserId(userId: string) {
    return this.resultSliderPropRepository.getResultSliderPropsByUserId(userId);
  }
}
