import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateChatMessageDto } from './dto/createChatMessage.dto';
import { ChatMessageWithRelationsDto } from './dto/messageWithRelations.dto';
import { ChatMessageEntity } from './chat-message.entity';
import { UpdateChatMessageDto } from './dto/updateChatMessage.dto';
import { ChatMessageWithPropsDto } from './dto/messageWithProps.dto';
import { MessageType } from '@prisma/client';
import { PageRequest } from '../../utils/pageable.utils';
import { Prisma } from '.prisma/client';

@Injectable()
export class ChatMessageRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  public async createChatMessage({
                                   prevMessageIds,
                                   chatId,
                                   startingChatId,
                                   sliderProps,
                                   prevChoiceIds,
                                   nextChoices,
                                   infoPopUps,
                                   ...data
                                 }: CreateChatMessageDto): Promise<ChatMessageEntity> {
    return this.prisma.chatMessage.create({
      data: {
        ...data,
        ...(nextChoices && { nextChoices: { createMany: { data: nextChoices, skipDuplicates: true } } }),
        ...(sliderProps && { sliderProps: { create: sliderProps } }),
        ...(infoPopUps && { infoPopUps: { create: infoPopUps } }),
        ...(startingChatId && { startingChat: { connect: { id: startingChatId } } }),
        ...(chatId && { chat: { connect: { id: chatId } } }),
        ...(prevMessageIds && {
          prevMessages: {
            connect: prevMessageIds.map((id) => {
              return {
                id: id
              };
            })
          }
        }), ...(prevChoiceIds && {
          prevChoices: {
            connect: prevChoiceIds.map((id) => {
              return {
                id: id
              };
            })
          }
        })
      }

    });
  }


  public async findChatMessageById(id: string, userIds: string[]): Promise<ChatMessageWithRelationsDto> {
    return this.prisma.chatMessage.findUnique({
      where: { id },
      include: {
        nextChoices: {
          include: {
            resultMessageChoice: { where: { userId: { in: userIds } } }
          }
        },
        sliderProps: true,
        nextMessage: true,
        infoPopUps: true,
        prevMessages: true,
        stepChatMessages: {
          where: {
            user: {
              id: { in: userIds }
            }
          }
        }
      }
    });
  }

  public async findChatMessagesWithPropsById(id: string): Promise<ChatMessageWithPropsDto> {
    return this.prisma.chatMessage.findUnique({
      where: { id },
      include: {
        nextChoices: true,
        sliderProps: true,
        infoPopUps: true
      }
    });
  }


  public async updateChatMessage(id: string, {
    prevMessageIds,
    chatId,
    sliderProps,
    infoPopUps,
    nextMessageId,
    nextChoices,
    ...data
  }: Partial<UpdateChatMessageDto>): Promise<ChatMessageEntity> {
    return this.prisma.chatMessage.update({
      where: { id },
      data: {
        ...data,
        ...(nextChoices && {
          nextChoices: {
            disconnect: [],
            createMany: { data: nextChoices, skipDuplicates: true }
          }
        }), ...(prevMessageIds && {
          prevMessages: {
            connect: prevMessageIds.map((id) => {
              return {
                id
              };
            })
          }
        }),
        ...(chatId && { chat: { connect: { id: chatId } } }),
        ...(nextMessageId && { nextMessage: { connect: { id: nextMessageId } } })
      }
    });
  }

  public async deleteChatMessage(id: string): Promise<ChatMessageEntity> {
    return this.prisma.chatMessage.delete({
      where: { id }
    });
  }

  public async findMessagesWithoutNextId(chatMessageId: string, chatId: string, pageRequest: PageRequest): Promise<ChatMessageEntity[]> {
    return this.prisma.chatMessage.findMany({
      where: this.getWhereWithoutNextId(chatMessageId, chatId, pageRequest.search),
      ...pageRequest.getFilter()
    });
  }

  public async countMessagesWithoutNextId(chatMessageId: string, chatId: string, pageRequest: PageRequest) {
    return this.prisma.chatMessage.count({
      where: this.getWhereWithoutNextId(chatMessageId, chatId, pageRequest.search)
    });
  }

  private getWhereWithoutNextId(
    chatMessageId: string,
    chatId: string,
    search: string
  ): Prisma.ChatMessageWhereInput {
    const baseFilter: Prisma.ChatMessageWhereInput = {
      id: { not: chatMessageId },
      chatId: chatId,
      OR: [
        {
          type: { in: [MessageType.QUESTION_SINGLE, MessageType.CHALLENGE] },
          nextChoices: { some: {} }
        },
        {
          type: { notIn: [MessageType.QUESTION_SINGLE, MessageType.CHALLENGE] },
          OR: [
            { nextMessageId: null },
            { nextMessageId: chatMessageId }
          ]
        }
      ]
    };

    if (search) {
      baseFilter.OR = [
        ...(baseFilter.OR || []),
        {
          name: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          id: {
            contains: search,
            mode: 'insensitive'
          }
        }
      ];
    }

    return baseFilter;
  }

}
