import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { PageRequest } from '../../utils/pageable.utils';
import { CreateChatDto } from './dto/createChat.dto';
import { Prisma } from '.prisma/client';
import { ChatEntity } from './chat.entity';
import { UpdateChatDto } from './dto/updateChatDto';
import { ChatWithMessageDto } from './dto/chatWithMessage.dto';

@Injectable()
export class ChatRepository {
  constructor(
    private readonly prisma: PrismaService
  ) {
  }

  public async findChatById(id: string): Promise<ChatEntity> {
    return this.prisma.chat.findUnique({
      where: { id }
    });
  }

  public async findAllChats(pageRequest: PageRequest) {
    const where: Prisma.ChatWhereInput = {
      name: {
        contains: pageRequest.search || '',
        mode: 'insensitive'
      }
    };
    const [count, chats] = await Promise.all([
      this.prisma.chat.count({ where }),
      this.prisma.chat.findMany({
        where,
        skip: pageRequest.skip,
        take: pageRequest.pageSize,
        orderBy: pageRequest.sortBy
      })
    ]);

    return pageRequest.toPageResponse<ChatEntity>(chats, count);
  }

  public async createChat(data: CreateChatDto): Promise<ChatEntity> {
    return this.prisma.chat.create({
      data
    });
  }

  public async updateChat(id: string, data: Partial<UpdateChatDto>): Promise<ChatEntity> {
    return this.prisma.chat.update({
      where: { id },
      data
    });
  }

  public async deleteChat(chatId: string): Promise<ChatEntity> {
    return this.prisma.chat.delete({
      where: { id: chatId }
    });
  }

  public async createRelationWithUser(chatId: string, userId: string): Promise<ChatWithMessageDto> {
    return this.prisma.chat.update({
        where: { id: chatId },
        data: { users: { connect: { id: userId } } },
        include: {startMessage: {include: {nextMessage: true, nextChoices: true, sliderProps: true, infoPopUps: true}}}
      }
    );
  }
}