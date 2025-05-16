import { Injectable } from '@nestjs/common';
import { Repository } from '../../database/repository.service';
import { CreateChatMessageDto } from './dto/createChatMessage.dto';
import { ChatMessageWithRelationsDto } from './dto/messageWithRelations.dto';
import { ChatMessageEntity } from './chat-message.entity';
import { UpdateChatMessageDto } from './dto/updateChatMessage.dto';
import { ChatMessageWithPropsDto } from './dto/messageWithProps.dto';
import { MessageType } from '@prisma/client';
import { Prisma } from '.prisma/client';
import { PageRequest } from '../../utils/page-request.utils';

@Injectable()
export class ChatMessageRepository {
  private readonly  chatMessageRepository: Prisma.ChatMessageDelegate;
  constructor(repository: Repository) {
    this.chatMessageRepository = repository.chatMessage
  }


  public async createChatMessage({
                                   prevMessageIds,
                                   // chatId,
                                   // startingChatId,
                                   prevChoiceIds,
                                   nextChoices,
                                   infoPopUps,
                                   ...data
                                 }: CreateChatMessageDto): Promise<ChatMessageEntity> {
    return this.chatMessageRepository.create({
      data: {
        ...data,
        ...(nextChoices && { nextChoices: { createMany: { data: nextChoices, skipDuplicates: true } } }),
        ...(infoPopUps && { infoPopUps: { create: infoPopUps } }),
        // ...(startingChatId && { startingChat: { connect: { id: startingChatId } } }),
        // ...(chatId && { chat: { connect: { id: chatId } } }),
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
      } as Prisma.ChatMessageUncheckedCreateInput

    });
  }


  public async findChatMessageById(id: string, userIds: string[]): Promise<ChatMessageWithRelationsDto> {
    return this.chatMessageRepository.findUnique({
      where: { id },
      include: {
        nextChoices: {
          include: {
            resultMessageChoice: { where: { userId: { in: userIds } } }
          }
        },
        // sliderProps: true,
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
    return this.chatMessageRepository.findUnique({
      where: { id },
      include: {
        nextChoices: true,
        // sliderProps: true,
        infoPopUps: true
      }
    });
  }


  public async updateChatMessage(id: string, {
    prevMessageIds,
    chatId,
    infoPopUps,
    nextMessageId,
    nextChoices,
    ...data
  }: Partial<UpdateChatMessageDto>): Promise<ChatMessageEntity> {
    return this.chatMessageRepository.update({
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
        ...(nextMessageId !== undefined && { nextMessageId })
      } as Prisma.ChatMessageUncheckedUpdateInput
    });
  }

  public async deleteChatMessage(id: string): Promise<ChatMessageEntity> {
    return this.chatMessageRepository.delete({
      where: { id }
    });
  }

  public async findMessagesWithoutNextId(chatMessageId: string, chatId: string, pageRequest: PageRequest): Promise<ChatMessageEntity[]> {
    return this.chatMessageRepository.findMany({
      where: this.getWhereWithoutNextId(chatMessageId, chatId, pageRequest.search),
      ...pageRequest.getFilter()
    });
  }

  public async countMessagesWithoutNextId(chatMessageId: string, chatId: string, pageRequest: PageRequest) {
    return this.chatMessageRepository.count({
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
