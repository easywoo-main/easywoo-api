import { Injectable } from '@nestjs/common';
import { Repository } from '../../database/repository.service';
import { ChatMessageWithRelationsDto } from './dto/messageWithProps.dto';
import { ChatMessageEntity } from './chat-message.entity';
import { ChatMessageWithChoicesDto } from './dto/messageWithChoices.dto';
import { Prisma } from '.prisma/client';
import { FilterChatMessage } from './dto/filterChatMessageQuery.dto';
import { ChatMessage } from '@prisma/client';
import { CreateChatMessageWithRelationDto } from './dto/createChatMessageWithRelation.dto';
import { UpdateChatMessageWithRelationDto } from './dto/updateChatMessageWithRelation.dto';
import { MessageChoiceRepository } from '../message-choice/message-choice.repository';

@Injectable()
export class ChatMessageRepository {
  private readonly  chatMessageRepository: Prisma.ChatMessageDelegate;
  constructor(repository: Repository, private readonly messageChoiceRepository: MessageChoiceRepository) {
    this.chatMessageRepository = repository.chatMessage
  }


  public async createChatMessage({
                                   startingChatId,
                                   nextChoices,
                                   sliderPropIds,
                                   ...data
                                 }: CreateChatMessageWithRelationDto): Promise<ChatMessageEntity> {
    return this.chatMessageRepository.create({
      data: {
        ...data,
        ...(nextChoices && { nextChoices: { create: nextChoices } }),
        ...(startingChatId
          && { startingChat: { connect: { id: startingChatId } } }
        ),
        ...(sliderPropIds && { sliderProps: { connect: sliderPropIds.map(id => ({ id })) } }),
        ...(data.stepId && {
          prevMessages: {connect: await this.getAllChatMessageIdsByGoToStep(data.stepId, data.chatId)},
          checkpointMessage: {connect: await this.getAllChatMessageIdsByRestartFrom(data.stepId, data.chatId)},
          prevChoices: {connect: await this.messageChoiceRepository.findAllMessageChoiceIdsByGoToStep(data.stepId, data.chatId)}
        })
      } as Prisma.ChatMessageUncheckedCreateInput,
    });
  }

  public async findChatMessageByStepIdAndChatId(stepId: number, chatId: string): Promise<ChatMessage> {
    return this.chatMessageRepository.findUnique({where: {stepId_chatId:{stepId, chatId}}})
  }

  public async findChatMessageByStepNameAndChatId(stepName: string, chatId: string): Promise<ChatMessage> {
    return this.chatMessageRepository.findUnique({where: {stepName_chatId:{stepName, chatId}}})
  }

  public async findChatMessageById(
    id: string,
  ): Promise<ChatMessageWithRelationsDto> {
    return this.chatMessageRepository.findUnique({
      where: { id },
      include: {
        nextChoices: true,
        // nextMessage: true,
        // restartMessage: true,
        sliderProps: true,
      }
    });
  }

  public async findChatMessagesWithPropsById(id: string): Promise<ChatMessageWithChoicesDto> {
    return this.chatMessageRepository.findUnique({
      where: { id },
      include: {
        nextChoices: true,
      }
    });
  }


  public async updateChatMessage(
    id: string,
    {
      startingChatId,
      nextChoices,
      sliderPropIds,
      answersIds,
      ...data
    }: UpdateChatMessageWithRelationDto
  ): Promise<ChatMessageEntity> {
    return this.chatMessageRepository.update({
      where: { id },
      data: {
        ...data,
        ...(sliderPropIds && { sliderProps: { set: sliderPropIds.map(id => ({ id })) } }),
        ...(startingChatId
          && { startingChat: { connect: { id: startingChatId } } }
        ),
        nextChoices: { set: answersIds },
        ...(data.stepId && {
          prevMessages: {set: await this.getAllChatMessageIdsByGoToStep(data.stepId, data.chatId)},
          checkpointMessage: {set: await this.getAllChatMessageIdsByRestartFrom(data.stepId, data.chatId)},
          prevChoices: {set: await this.messageChoiceRepository.findAllMessageChoiceIdsByGoToStep(data.stepId, data.chatId)}
        })
      } as Prisma.ChatMessageUncheckedUpdateInput,
    });
  }

  public async getAllChatMessageIdsByGoToStep(goToStep:number, chatId: string) {
    return this.chatMessageRepository.findMany({where: {goToStep, chatId}, select: {id: true}} )
  }

  private async getAllChatMessageIdsByRestartFrom(restartFrom: number, chatId: string){
    return this.chatMessageRepository.findMany({where: {restartFrom, chatId}, select: {id: true}} )

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
      },
      ...filterChatMessage.getFilter(),
      orderBy: {stepId:"desc" },
      include: {
        nextChoices: true,
      }
    });
  }

  public async countMessagesWithoutNextId(filterChatMessage: FilterChatMessage) {
    return this.chatMessageRepository.count({
      where: {
        chatId: filterChatMessage.chatId,
      },
    });
  }
}
