import { Injectable } from '@nestjs/common';
import { ChatMessageRepository } from './chat-message.repository';
import { CreateChatMessageDto } from './dto/createChatMessage.dto';
import { UpdateChatMessageDto } from './dto/updateChatMessage.dto';
import { CheckExists } from '../../decorators';
import { MessageSliderService } from '../message-slider/message-slider.service';
import { MessageType } from '@prisma/client';
import { CHALLENGE_MESSAGE_CHOICE } from '../message-choice/message-choice.constants';
import { PageRequest } from '../../utils/page-request.utils';
import { FilterChatMessage } from './dto/filterChatMessageQuery.dto';

@Injectable()
export class ChatMessageService {
  constructor(
    private readonly chatMessageRepository: ChatMessageRepository,
  ) {
  }

  public async createChatMessage(newChatMessage: CreateChatMessageDto) {
    return this.chatMessageRepository.createChatMessage(newChatMessage);
  }

  @CheckExists('Chat Message Not Found')
  public async findChatMessageWithRelationById(chatMessageId: string, userIds?: string | string[]) {
    return this.chatMessageRepository.findChatMessageByIdRecursive(
      chatMessageId,
      userIds ? Array.isArray(userIds) ? userIds : [userIds]: []
    );
  }

  @CheckExists('Chat Message Not Found')
  public async findChatMessagesWithPropsById(chatMessageId: string) {
    return this.chatMessageRepository.findChatMessagesWithPropsById(chatMessageId);
  }

  public async updateChatMessageById(chatMessageId: string, chatMessage: UpdateChatMessageDto) {
    await this.findChatMessageWithRelationById(chatMessageId);

    return this.chatMessageRepository.updateChatMessage(chatMessageId, chatMessage);
  }

  public async deleteChatMessageById(chatMessageId: string) {
    await this.findChatMessageWithRelationById(chatMessageId);
    return this.chatMessageRepository.deleteChatMessage(chatMessageId);
  }

  public async findAllByChatMessageId(filterChatMessage: FilterChatMessage) {
    const [chatMessages, count] = await Promise.all([
      this.chatMessageRepository.findMessagesWithoutNextId(filterChatMessage),
      this.chatMessageRepository.countMessagesWithoutNextId(filterChatMessage)
    ]);

    return filterChatMessage.toPageResponse(chatMessages, count);
  }

}
