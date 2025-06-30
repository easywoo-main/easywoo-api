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
      where: {
        chatId: filterChatMessageWithUserId.chatId,
        userId: filterChatMessageWithUserId.userId,
      },
      ...filterChatMessageWithUserId.getFilter(),
      include: {
        chatMessage: true,
        messageChoice: true,
      }
    });
  }

  public async countMessagesWithoutNextId(filterChatMessageWithUserId: FilterChatMessageWithUserId) {
    return this.stepChatMessageRepository.count({
      where: {
        chatId: filterChatMessageWithUserId.chatId,
        userId: filterChatMessageWithUserId.userId,
      }
    });
  }
}
