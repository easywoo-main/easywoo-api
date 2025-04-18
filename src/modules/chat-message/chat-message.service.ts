import { Injectable } from '@nestjs/common';
import { ChatMessageRepository } from './chat-message.repository';
import { CreateChatMessageDto } from './dto/createChatMessage.dto';
import { UpdateChatMessageDto } from './dto/updateChatMessage.dto';

@Injectable()
export class ChatMessageService {
  constructor(private readonly chatMessageRepository: ChatMessageRepository) {}

  public async createChatMessage(newChatMessage: CreateChatMessageDto) {
    return this.chatMessageRepository.createChatMessage(newChatMessage);
  }

  public async findChatMessageById(chatMessageId: string) {
    return this.chatMessageRepository.findChatMessageById(chatMessageId);
  }

  public async updateChatMessageById(chatMessageId: string, chatMessage: Partial<UpdateChatMessageDto>) {
    return this.chatMessageRepository.updateChatMessage(chatMessageId, chatMessage);
  }

  public async deleteChatMessageById(chatMessageId: string) {
    return this.chatMessageRepository.deleteChatMessage(chatMessageId);
  }

}
