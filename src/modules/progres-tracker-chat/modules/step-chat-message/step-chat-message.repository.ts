import { Injectable } from '@nestjs/common';
import { Repository } from '../../../../database/repository.service';
import { StepChatMessageEntity } from './step-chat-message.entity';
import { Prisma } from '.prisma/client';
import { CreateStepChatMessageDto } from './dtos/createStepChatMessage.dto';
import { FilterChatMessageWithUserId } from '../../dtos/filterChatMessageQuery.dto';
import { StepChatMessageDto } from './dtos/stepChatMessage.dto';

@Injectable()
export class StepChatMessageRepository {
  private readonly  stepChatMessageRepository: Prisma.StepChatMessageDelegate;
  constructor(repository: Repository) {
    this.stepChatMessageRepository = repository.stepChatMessage
  }

  public async createStepChatMessage(data: CreateStepChatMessageDto): Promise<StepChatMessageEntity> {
    return this.stepChatMessageRepository.create({data: data as unknown as Prisma.StepChatMessageUncheckedCreateInput});
  }

  public async findMessagesWithoutNextId(filterChatMessageWithUserId: FilterChatMessageWithUserId): Promise<StepChatMessageDto[]> {
    return this.stepChatMessageRepository.findMany({
      where: this.getFilterMessage(filterChatMessageWithUserId),
      ...filterChatMessageWithUserId.getFilter(),
      include: {
        chatMessage: true,
        messageChoice: true,
      }
    });
  }

  private getFilterMessage(filter: FilterChatMessageWithUserId): Prisma.StepChatMessageWhereInput {
    const where: Prisma.StepChatMessageWhereInput = {
      userId: filter.userId,
      chatId: filter.chatId,
    };

    if (filter.startDate || filter.endDate) {
      where.createdAt = {};
      if (filter.startDate) {
        where.createdAt.gte = filter.startDate;
      }
      if (filter.endDate) {
        where.createdAt.lte = filter.endDate;
      }
    }

    return where;
  }

  public async countMessagesWithoutNextId(filterChatMessageWithUserId: FilterChatMessageWithUserId) {
    return this.stepChatMessageRepository.count({
      where: this.getFilterMessage(filterChatMessageWithUserId),
  });
  }

  public async findLastStepChatMessageByChatIdAndUserId(chatId: string, userId: string): Promise<StepChatMessageEntity> {
    return this.stepChatMessageRepository.findFirst({where: {chatId, userId}, orderBy: {updatedAt: Prisma.SortOrder.asc}});
  }
}
