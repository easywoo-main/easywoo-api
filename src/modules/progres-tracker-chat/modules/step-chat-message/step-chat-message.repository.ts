import { Injectable } from '@nestjs/common';
import { Repository } from '../../../../database/repository.service';
import { StepChatMessageEntity } from './step-chat-message.entity';
import { CreateStepChatMessageDtoWithUserId } from './dtos/createStepChatMessageWithUserId.dto';
import { Prisma } from '.prisma/client';
import { StepChatMessageDto } from './dtos/stepChatMessage.dto';
import { PageRequest } from '../../../../utils/page-request.utils';

@Injectable()
export class StepChatMessageRepository {
  private readonly  stepChatMessageRepository: Prisma.StepChatMessageDelegate;
  constructor(repository: Repository) {
    this.stepChatMessageRepository = repository.stepChatMessage
  }

  public async createStepChatMessage(data: CreateStepChatMessageDtoWithUserId): Promise<StepChatMessageEntity> {
    return this.stepChatMessageRepository.create({data});
  }

  public async getStepChatMessagesByUserId(userId: string): Promise<StepChatMessageEntity[]> {
    return this.stepChatMessageRepository.findMany({where: {userId}});
  }

  public async getAllStepChatMessageByChatMessageId(chatMessageId: string, pageRequest: PageRequest): Promise<StepChatMessageDto[]> {
    return this.stepChatMessageRepository.findMany({
      where: {
        chatMessageId: chatMessageId,
        ...this.getWhereProp(pageRequest)
      },
      ...pageRequest.getFilter(),
      include: { user: true }
    });
  }

  public async getCountStepChatMessage(chatMessageId: string, pageRequest: PageRequest) {
    return this.stepChatMessageRepository.count({
      where: {
        chatMessageId: chatMessageId,
        ...this.getWhereProp(pageRequest)
      }
    });
  }
  private getWhereProp(pageRequest: PageRequest): Prisma.StepChatMessageWhereInput {
    return {
      ...(pageRequest.search && {
        user: {
          is: {
            OR: [
              {
                name: {
                  contains: pageRequest.search,
                  mode: 'insensitive'
                }
              },
              {
                email: {
                  contains: pageRequest.search,
                  mode: 'insensitive'
                }
              },
              {
                id: {
                  contains: pageRequest.search,
                  mode: 'insensitive'
                }
              }
            ]
          }
        }
      })
    };
  }
}
