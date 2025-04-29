import { Injectable } from '@nestjs/common';
import { ChatMessageRepository } from './chat-message.repository';
import { CreateChatMessageDto } from './dto/createChatMessage.dto';
import { UpdateChatMessageDto } from './dto/updateChatMessage.dto';
import { CheckExists } from '../../decorators';
import { MessageSliderController } from '../message-slider/message-slider.controller';
import { MessageSliderService } from '../message-slider/message-slider.service';

@Injectable()
export class ChatMessageService {
  constructor(
    private readonly chatMessageRepository: ChatMessageRepository,
    private readonly messageSliderService: MessageSliderService
  ) {}

  public async createChatMessage(newChatMessage: CreateChatMessageDto) {
    console.log('newChatMessage', newChatMessage);
    return this.chatMessageRepository.createChatMessage(newChatMessage);
  }

  @CheckExists("Chat Message Not Found")
  public async findChatMessageById(chatMessageId: string) {
    return this.chatMessageRepository.findChatMessageById(chatMessageId);
  }

  public async updateChatMessageById(chatMessageId: string, chatMessage: Partial<UpdateChatMessageDto>) {
    await this.messageSliderService.bulkUpsertMessageSlider(chatMessageId, chatMessage.sliderProps)
    delete chatMessage.sliderProps;
    return this.chatMessageRepository.updateChatMessage(chatMessageId, chatMessage);
  }

  public async deleteChatMessageById(chatMessageId: string) {
    return this.chatMessageRepository.deleteChatMessage(chatMessageId);
  }
}
