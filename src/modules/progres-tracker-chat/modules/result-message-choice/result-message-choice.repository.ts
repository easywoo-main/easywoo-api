import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { ResultMessageChoiceEntity } from './result-message-choice.entity';
import { CreateResultMessageChoiceDtoWithUserId } from './dtos/createResultMessageChoiceWithUserId.dto';
import { PageRequest } from '../../../../utils/pageable.utils';
import { Prisma } from '.prisma/client';
import { ResultMessageChoiceDto } from './dtos/resultMessageChoice.dto';

@Injectable()
export class ResultMessageChoiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createResultMessageChoice(data: CreateResultMessageChoiceDtoWithUserId): Promise<ResultMessageChoiceEntity> {
    return this.prisma.resultMessageChoice.create({data});
  }

  public async getCountResultMessageChoice(messageChoiceId: string, pageRequest: PageRequest) {
    return this.prisma.resultMessageChoice.count({
      where: {
        messageChoiceId: messageChoiceId,
        ...this.getWhereProp(pageRequest),
      },
    });
  }

  public async getAllResultMessageChoiceByMessageChoiceId(messageChoiceId: string, pageRequest: PageRequest): Promise<ResultMessageChoiceDto[]> {
    return this.prisma.resultMessageChoice.findMany({
      where: {
        messageChoiceId: messageChoiceId,
        ...this.getWhereProp(pageRequest),
      },
      ...pageRequest.getFilter(),
      include: { user: true }
    });
  }

  private getWhereProp(pageRequest: PageRequest): Prisma.ResultMessageChoiceWhereInput {
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
