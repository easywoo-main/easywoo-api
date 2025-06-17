import { Injectable } from '@nestjs/common';
import { Repository } from '../../../../database/repository.service';
import { ResultMessageChoiceEntity } from './result-message-choice.entity';
import { CreateResultMessageChoiceDtoWithUserId } from './dtos/createResultMessageChoiceWithUserId.dto';
import { Prisma } from '.prisma/client';
import { ResultMessageChoiceDto } from './dtos/resultMessageChoice.dto';
import { PageRequest } from '../../../../utils/page-request.utils';

@Injectable()
export class ResultMessageChoiceRepository {
  private readonly resultMessageChoiceRepository: Prisma.ResultMessageChoiceDelegate;
  constructor(repository: Repository) {
    this.resultMessageChoiceRepository = repository.resultMessageChoice
  }

  public async createResultMessageChoice(data: CreateResultMessageChoiceDtoWithUserId): Promise<ResultMessageChoiceEntity> {
    return this.resultMessageChoiceRepository.create({data});
  }

  public async getCountResultMessageChoice(messageChoiceId: string, pageRequest: PageRequest) {
    return this.resultMessageChoiceRepository.count({
      where: {
        messageChoiceId: messageChoiceId,
        ...this.getWhereProp(pageRequest),
      },
    });
  }

  public async getAllResultMessageChoiceByMessageChoiceId(messageChoiceId: string, pageRequest: PageRequest): Promise<ResultMessageChoiceDto[]> {
    return this.resultMessageChoiceRepository.findMany({
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
