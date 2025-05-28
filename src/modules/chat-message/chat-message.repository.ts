import { Injectable } from '@nestjs/common';
import { Repository } from '../../database/repository.service';
import { CreateChatMessageDto } from './dto/createChatMessage.dto';
import { ChatMessageWithRelationsDto } from './dto/messageWithRelations.dto';
import { ChatMessageEntity } from './chat-message.entity';
import { UpdateChatMessageDto } from './dto/updateChatMessage.dto';
import { ChatMessageWithPropsDto } from './dto/messageWithProps.dto';
import { Prisma } from '.prisma/client';
import { FilterChatMessage } from './dto/filterChatMessageQuery.dto';
import { ChatMessage } from '@prisma/client';
import { CreateChatMessageWithRelationDto } from './dto/createChatMessageWithRelation.dto';

@Injectable()
export class ChatMessageRepository {
  private readonly  chatMessageRepository: Prisma.ChatMessageDelegate;
  constructor(repository: Repository) {
    this.chatMessageRepository = repository.chatMessage
  }


  public async createChatMessage({
                                   sliderPropIds,
                                   startingChatId,
    answers,
                                   ...data
                                 }: CreateChatMessageWithRelationDto): Promise<ChatMessageEntity> {
    return this.chatMessageRepository.create({
      data: {
        ...data,
        ...(answers && { nextChoices: {create: answers} }),
        sliderProp: { connect: sliderPropIds.map((id) => ({ id })) },
        ...(startingChatId
          && { startingChat: { connect: { id: startingChatId } } }
        )
      } as Prisma.ChatMessageUncheckedCreateInput,
    });
  }

  public async findChatMessageByStepIdAndChatId(stepId: number, chatId: string): Promise<ChatMessage> {
    return this.chatMessageRepository.findUnique({where: {stepId_chatId:{stepId, chatId}}})

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

  public async findChatMessagesWithPropsById(id: string): Promise<ChatMessageWithPropsDto> {
    return this.chatMessageRepository.findUnique({
      where: { id },
      include: {
        nextChoices: true,
        // sliderProps: true,
      }
    });
  }


  public async updateChatMessage(
    id: string,
    {
      sliderPropIds,
      startingChatId,
      ...data
    }: UpdateChatMessageDto
  ): Promise<ChatMessageEntity> {
    console.log({
      sliderPropIds,
      startingChatId,
      // answers,
      ...data
    });
    return this.chatMessageRepository.update({
      where: { id },
      data: {
        ...data,
        // ...(answers && { nextChoices: {create: answers} }),
        ...(sliderPropIds && {sliderProp: { connect: sliderPropIds.map((id) => ({ id })) }}),
        ...(startingChatId
          && { startingChat: { connect: { id: startingChatId } } }
        )
      },
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
        prevChoices: {where: {id: filterChatMessage.messageChoiceId}},
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
}
