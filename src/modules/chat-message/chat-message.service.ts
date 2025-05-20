import { Injectable } from '@nestjs/common';
import { ChatMessageRepository } from './chat-message.repository';
import { CreateChatMessageDto } from './dto/createChatMessage.dto';
import { UpdateChatMessageDto } from './dto/updateChatMessage.dto';
import { CheckExists } from '../../decorators';
import { MessageSliderService } from '../message-slider/message-slider.service';
import { MessageType } from '@prisma/client';
import { CHALLENGE_MESSAGE_CHOICE } from '../message-choice/message-choice.constants';
import { InfoPopUpService } from '../info-pop-up/info-pop-up.service';
import { PageRequest } from '../../utils/page-request.utils';

@Injectable()
export class ChatMessageService {
  constructor(
    private readonly chatMessageRepository: ChatMessageRepository,
    private readonly messageSliderService: MessageSliderService,
    private readonly infoPopUpService: InfoPopUpService
  ) {
  }

  public async createChatMessage(newChatMessage: CreateChatMessageDto) {
    if (newChatMessage.type === MessageType.CHALLENGE) {
      newChatMessage.nextChoices = CHALLENGE_MESSAGE_CHOICE;
    }
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

  public async updateChatMessageById(chatMessageId: string, chatMessage: Partial<UpdateChatMessageDto>) {
    await this.findChatMessageWithRelationById(chatMessageId);

    await Promise.all([
      this.infoPopUpService.bulkUpsertPopUp(chatMessageId, chatMessage?.infoPopUps ?? [])
    ]);

    delete chatMessage.infoPopUps;

    return this.chatMessageRepository.updateChatMessage(chatMessageId, chatMessage);
  }

  public async deleteChatMessageById(chatMessageId: string) {
    await this.findChatMessageWithRelationById(chatMessageId);
    return this.chatMessageRepository.deleteChatMessage(chatMessageId);
  }

  public async findAllByChatMessageId(chatMessageId: string, chatId: string, pageRequest: PageRequest) {
    const [chatMessages, count] = await Promise.all([
      this.chatMessageRepository.findMessagesWithoutNextId(chatMessageId,chatId, pageRequest),
      this.chatMessageRepository.countMessagesWithoutNextId(chatMessageId, chatId, pageRequest)
    ]);

    return pageRequest.toPageResponse(chatMessages, count);
  }

}
