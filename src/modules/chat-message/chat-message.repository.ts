import { Injectable } from '@nestjs/common';
import { Repository } from '../../database/repository.service';
import { ChatMessageWithRelationsDto } from './dto/messageWithRelations.dto';
import { ChatMessageEntity } from './chat-message.entity';
import { ChatMessageWithPropsDto } from './dto/messageWithProps.dto';
import { Prisma } from '.prisma/client';
import { FilterChatMessage } from './dto/filterChatMessageQuery.dto';
import { ChatMessage } from '@prisma/client';
import { CreateChatMessageWithRelationDto } from './dto/createChatMessageWithRelation.dto';
import { UpdateChatMessageWithRelationDto } from './dto/updateChatMessageWithRelation.dto';

@Injectable()
export class ChatMessageRepository {
  private readonly  chatMessageRepository: Prisma.ChatMessageDelegate;
  constructor(repository: Repository) {
    this.chatMessageRepository = repository.chatMessage
  }


  public async createChatMessage({
                                   startingChatId,
                                   nextChoices,
                                   ...data
                                 }: CreateChatMessageWithRelationDto): Promise<ChatMessageEntity> {
    return this.chatMessageRepository.create({
      data: {
        ...data,
        ...(nextChoices && { nextChoices: {create: nextChoices} }),
        ...(startingChatId
          && { startingChat: { connect: { id: startingChatId } } }
        )
      } as Prisma.ChatMessageUncheckedCreateInput,
    });
  }

  public async findChatMessageByStepIdAndChatId(stepId: number, chatId: string): Promise<ChatMessage> {
    return this.chatMessageRepository.findUnique({where: {stepId_chatId:{stepId, chatId}}})

  }

  public async findChatMessageById(
    id: string,
  ): Promise<ChatMessageWithRelationsDto> {
    return this.chatMessageRepository.findUnique({
      where: { id },
      include: {
        nextChoices: {include: {nextMessage: true}},
        nextMessage: true,
        restartMessage: true,
        // sliderProp: true,
      }
    });
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
      startingChatId,
      nextChoices,
      ...data
    }: UpdateChatMessageWithRelationDto
  ): Promise<ChatMessageEntity> {
    return this.chatMessageRepository.update({
      where: { id },
      data: {
        ...data,
        // ...(answers && { nextChoices: {create: answers} }),
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
        // id: {not: filterChatMessage.chatMessageId},
      },
      // include: {
      //   prevMessages: {where: {id: filterChatMessage.chatMessageId}},
      //   prevChoices: {where: {id: filterChatMessage.messageChoiceId}},
      // },
      ...filterChatMessage.getFilter(),
      orderBy: {prevMessages: {_count: "desc"} }
    });
  }

  public async countMessagesWithoutNextId(filterChatMessage: FilterChatMessage) {
    return this.chatMessageRepository.count({
      where: {
        chatId: filterChatMessage.chatId,
        // id: {not: filterChatMessage.chatMessageId}
      },
    });
  }
}
