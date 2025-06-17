import { Injectable } from '@nestjs/common';
import { Repository } from '../../../../database/repository.service';
import { CreateResultSliderPropDtoWithUserId } from './dtos/createResultSliderPropWithUserId.dto';
import { ResultSliderPropEntity } from './result-slider-prop.entity';
import { Prisma } from '.prisma/client';

@Injectable()
export class ResultSliderPropRepository {
  private readonly  resultSliderPropRepository: Prisma.ResultSliderPropDelegate;
  constructor(repository: Repository) {
    this.resultSliderPropRepository = repository.resultSliderProp
  }

  public async createResultSliderProp(data: CreateResultSliderPropDtoWithUserId): Promise<ResultSliderPropEntity> {
    return this.resultSliderPropRepository.create({
      data
    });
  }

  public async createManyResultSliderProp(data: CreateResultSliderPropDtoWithUserId[]): Promise<ResultSliderPropEntity[]> {
    return this.resultSliderPropRepository.createManyAndReturn({
      data
    });
  }

  public async getResultSliderPropsByUserId(userId: string): Promise<ResultSliderPropEntity[]>{
    return this.resultSliderPropRepository.findMany({where: {userId}});
  }
}
