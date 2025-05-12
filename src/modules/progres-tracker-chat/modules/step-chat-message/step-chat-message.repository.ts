import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { StepChatMessageEntity } from './step-chat-message.entity';
import { CreateStepChatMessageDtoWithUserId } from './dtos/createStepChatMessageWithUserId.dto';
import { PageRequest } from '../../../../utils/pageable.utils';
import { Prisma } from '.prisma/client';
import { StepChatMessageDto } from './dtos/stepChatMessage.dto';

@Injectable()
export class StepChatMessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createStepChatMessage(data: CreateStepChatMessageDtoWithUserId): Promise<StepChatMessageEntity> {
    return this.prisma.stepChatMessage.create({data});
  }

  public async getStepChatMessagesByUserId(userId: string): Promise<StepChatMessageEntity[]> {
    return this.prisma.stepChatMessage.findMany({where: {userId}});
  }

  public async getAllStepChatMessageByChatMessageId(chatMessageId: string, pageRequest: PageRequest): Promise<StepChatMessageDto[]> {
    return this.prisma.stepChatMessage.findMany({
      where: {
        chatMessageId: chatMessageId,
        ...this.getWhereProp(pageRequest)
      },
      ...pageRequest.getFilter(),
      include: { user: true }
    });
  }

  public async getCountStepChatMessage(chatMessageId: string, pageRequest: PageRequest) {
    return this.prisma.stepChatMessage.count({
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
