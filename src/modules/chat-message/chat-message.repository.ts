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
import { FilterChatMessage } from './dto/filterChatMessageQuery.dto';

@Injectable()
export class ChatMessageRepository {
  private readonly  chatMessageRepository: Prisma.ChatMessageDelegate;
  constructor(repository: Repository) {
    this.chatMessageRepository = repository.chatMessage
  }


  public async createChatMessage({
                                   prevMessageIds,
                                   chatId,
                                   startingChatId,
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

  public async findChatMessageByIdRecursive(
    id: string,
    userIds: string[],
    depth = 200 //todo
  ): Promise<ChatMessageWithRelationsDto | null> {
    if (depth <= 0) {
      return null;
    }

    const message = await this.chatMessageRepository.findUnique({
      where: { id },
      include: {
        nextChoices: {
          include: {
            resultMessageChoice: {
              where: { userId: { in: userIds } },
            },
          },
        },
        nextMessage: true,
        infoPopUps: true,
        prevMessages: true,
        stepChatMessages: {
          where: {
            user: {
              id: { in: userIds },
            },
          },
        },
      },
    });

    if (!message) return null;

    // Рекурсивно завантажуємо nextMessage (якщо він є)
    if (message.nextMessage) {
      message.nextMessage = await this.findChatMessageByIdRecursive(
        message.nextMessage.id,
        userIds,
        depth - 1
      );
    }

    if (message.nextChoices && message.nextChoices.length > 0) {
      for (const choice of message.nextChoices) {
        if (choice.nextMessageId) {
          // @ts-ignore
          choice.nextMessage = await this.findChatMessageByIdRecursive(
            choice.nextMessageId,
            userIds,
            depth - 1
          );
        }
      }
    }

    return message;
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

  public async findMessagesWithoutNextId(filterChatMessage: FilterChatMessage): Promise<ChatMessageEntity[]> {
    return this.chatMessageRepository.findMany({
      where: {
        chatId: filterChatMessage.chatId,
        id: {not: filterChatMessage.chatMessageId},
      },
      include: {
        prevMessages: {where: {id: filterChatMessage.chatMessageId}},
        prevChoices: {where: {id: filterChatMessage.messageChoiceId}}

      },
      ...filterChatMessage.getFilter(),
      orderBy: {prevMessages: {_count: "desc"} }
    });
  }

  public async countMessagesWithoutNextId(filterChatMessage: FilterChatMessage) {
    return this.chatMessageRepository.count({
      where: {
        chatId: filterChatMessage.chatId,
        id: {not: filterChatMessage.chatMessageId}
      },
    });
  }

  private getWhere(
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
