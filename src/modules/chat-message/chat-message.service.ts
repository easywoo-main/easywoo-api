import { Injectable } from '@nestjs/common';
import { ChatMessageRepository } from './chat-message.repository';
import { CreateChatMessageDto } from './dto/createChatMessage.dto';
import { UpdateChatMessageDto } from './dto/updateChatMessage.dto';
import { CheckExists } from '../../decorators';
import { MessageSliderService } from '../message-slider/message-slider.service';
import { MessageType } from '@prisma/client';
import { CHALLENGE_MESSAGE_CHOICE } from '../message-choice/message-choice.constants';

@Injectable()
export class ChatMessageService {
  constructor(
    private readonly chatMessageRepository: ChatMessageRepository,
    private readonly messageSliderService: MessageSliderService,
  ) {}

  public async createChatMessage(newChatMessage: CreateChatMessageDto) {
    if (newChatMessage.type === MessageType.CHALLENGE) {
      newChatMessage.nextChoices = CHALLENGE_MESSAGE_CHOICE
    }
    return await this.chatMessageRepository.createChatMessage(newChatMessage);
  }

  @CheckExists("Chat Message Not Found")
  public async findChatMessageWithRelationById(chatMessageId: string) {
    return this.chatMessageRepository.findChatMessageById(chatMessageId);
  }

  @CheckExists("Chat Message Not Found")
  public async findChatMessagesWithPropsById(chatMessageId: string) {
    return this.chatMessageRepository.findChatMessagesWithPropsById(chatMessageId);
  }

  public async updateChatMessageById(chatMessageId: string, chatMessage: Partial<UpdateChatMessageDto>) {
    await this.findChatMessageWithRelationById(chatMessageId);
    await this.messageSliderService.bulkUpsertMessageSlider(chatMessageId, chatMessage.sliderProps)
    delete chatMessage.sliderProps;
    return this.chatMessageRepository.updateChatMessage(chatMessageId, chatMessage);
  }

  public async deleteChatMessageById(chatMessageId: string) {
    await this.findChatMessageWithRelationById(chatMessageId);
    return this.chatMessageRepository.deleteChatMessage(chatMessageId);
  }
}
