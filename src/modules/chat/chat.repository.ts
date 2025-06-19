import { Injectable } from '@nestjs/common';
import { Repository } from '../../database/repository.service';
import { CreateChatDto } from './dto/createChat.dto';
import { Prisma } from '.prisma/client';
import { ChatEntity } from './chat.entity';
import { UpdateChatDto } from './dto/updateChatDto';
import { ChatWithMessageDto } from './dto/chatWithMessage.dto';
import { ChatFilter } from './dto/chatFilter.dto';

@Injectable()
export class ChatRepository {
  private readonly chatRepository: Prisma.ChatDelegate;

  constructor(repository: Repository) {
    this.chatRepository = repository.chat;
  }

  public async findChatById(id: string): Promise<ChatEntity> {
    return this.chatRepository.findUnique({
      where: { id }
    });
  }

  public async findAllChats(pageRequest: ChatFilter): Promise<ChatEntity[]> {
    return this.chatRepository.findMany({
      where: this.getWhereChats(pageRequest), ...pageRequest.getFilter()
    });
  }

  public async countChats(pageRequest: ChatFilter) {
    return this.chatRepository.count({ where: this.getWhereChats(pageRequest) });
  }

  public async createChat(data: CreateChatDto): Promise<ChatEntity> {
    return this.chatRepository.create({
      data
    });
  }

  public async updateChat(id: string, data: UpdateChatDto): Promise<ChatEntity> {
    return this.chatRepository.update({
      where: { id }, data
    });
  }

  public async deleteChat(chatId: string): Promise<ChatEntity> {
    return this.chatRepository.delete({
      where: { id: chatId }
    });
  }

  public async createRelationWithUser(chatId: string, userId: string): Promise<ChatWithMessageDto> {
    return this.chatRepository.update({
      where: { id: chatId }, data: { users: { connect: { id: userId } } }, include: {
        startMessage: {
          include: {
            nextMessage: true, nextChoices: true
          }
        }
      }
    });
  }

  private getWhereChats(pageRequest: ChatFilter): Prisma.ChatWhereInput {
    return {
      name: {
        contains: pageRequest.search || '', mode: 'insensitive'
      }, ...(pageRequest.isDisabled !== undefined && { isDisabled: pageRequest.isDisabled })
    };
  }
}