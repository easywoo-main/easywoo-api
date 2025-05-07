import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { ResultMessageChoiceEntity } from './result-message-choice.entity';
import { CreateResultMessageChoiceDtoWithUserId } from './dtos/createResultMessageChoiceWithUserId.dto';

@Injectable()
export class ResultMessageChoiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createResultMessageChoice(data: CreateResultMessageChoiceDtoWithUserId): Promise<ResultMessageChoiceEntity> {
    return this.prisma.resultMessageChoice.create({data});
  }

  public async getResultMessageChoicesByUserId(userId: string): Promise<ResultMessageChoiceEntity[]> {
    return this.prisma.resultMessageChoice.findMany({where: {userId}});
  }
}
