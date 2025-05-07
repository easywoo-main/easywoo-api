import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateStepChatMessageDto } from './dtos/createStepChatMessage.dto';

@Injectable()
export class StepChatMessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createStepChatMessageRepository(data: CreateStepChatMessageDto): Promise<ResultSliderPropEntity> {}
}
