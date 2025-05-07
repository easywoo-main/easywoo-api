import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { StepChatMessageEntity } from './step-chat-message.entity';
import { CreateStepChatMessageDtoWithUserId } from './dtos/createStepChatMessageWithUserId.dto';

@Injectable()
export class StepChatMessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createStepChatMessage(data: CreateStepChatMessageDtoWithUserId): Promise<StepChatMessageEntity> {
    return this.prisma.stepChatMessage.create({data});
  }

  public async getStepChatMessagesByUserId(userId: string): Promise<StepChatMessageEntity[]> {
    return this.prisma.stepChatMessage.findMany({where: {userId}});
  }
}
