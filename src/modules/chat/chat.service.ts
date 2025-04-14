import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { PageRequest } from '../../utils/pageable.utils';
import { CheckExists } from '../../decorators';
import { CreateChatDto } from './dto/createChat.dto';
import { UpdateChatDto } from './dto/updateChatDto';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  public async findAllChat(pageRequest: PageRequest) {
    return this.chatRepository.findAllChats(pageRequest);
  }

  @CheckExists('Chat not found')
  public async findChatById(chatId: string) {
    return this.chatRepository.findChatById(chatId);
  }

  public async createChat(chatDto: CreateChatDto) {
    return this.chatRepository.createChat(chatDto);
  }

  public async updateChat(chatId: string, chatDto: Partial<UpdateChatDto>) {
    await this.findChatById(chatId);
    return this.chatRepository.updateChat(chatId, chatDto);
  }

  public async deleteChat(chatId: string) {
    await this.findChatById(chatId);
    return this.chatRepository.deleteChat(chatId);
  }
}
