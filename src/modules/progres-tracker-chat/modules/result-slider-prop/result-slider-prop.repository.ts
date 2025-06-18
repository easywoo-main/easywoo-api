import { Injectable } from '@nestjs/common';
import { Repository } from '../../../../database/repository.service';
import { CreateResultSliderPropDtoWithUserId } from './dtos/createResultSliderPropWithUserId.dto';
import { ResultSliderPropEntity } from './result-slider-prop.entity';
import { Prisma } from '.prisma/client';
import { SliderPropsFilterDto } from './dtos/sliderPropsFilter.dto';
import { ChartFilter } from './dtos/sliderPropsQuery.dto';

@Injectable()
export class ResultSliderPropRepository {
  private readonly resultSliderPropRepository: Prisma.ResultSliderPropDelegate;

  constructor(repository: Repository) {
    this.resultSliderPropRepository = repository.resultSliderProp;
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

  public async getResultSliderPropsByUserId(sliderPropsFilterDto: SliderPropsFilterDto): Promise<ResultSliderPropEntity[]> {

    return this.resultSliderPropRepository.findMany({
      where: {
        userId: sliderPropsFilterDto.userId,
        sliderPropId: sliderPropsFilterDto.sliderPropId,
        ...this.getUpdatedAtFilter(sliderPropsFilterDto),
      },
      orderBy: { updatedAt: Prisma.SortOrder.asc },
    });
  }

  private getUpdatedAtFilter(date:  Pick<SliderPropsFilterDto, 'startDate' | 'endDate'>) {
    let updatedAtFilter: Prisma.ResultSliderPropWhereInput = {};
    if (date.startDate && date.endDate) {
      updatedAtFilter = {
        updatedAt: {
          gte: date.startDate,
          lte: date.endDate,
        },
      };
    } else if (date.startDate) {
      updatedAtFilter = {
        updatedAt: {
          gte: date.startDate,
        },
      };
    } else if (date.endDate) {
      updatedAtFilter = {
        updatedAt: {
          lte: date.endDate,
        },
      };
    }
    return updatedAtFilter;
  }


  // public async getGroupSliderPropsByUserId(sliderPropsFilterDto: Omit<ChartFilter, "variables">, userId: string) {
  //   return this.resultSliderPropRepository.groupBy({
  //     by: ['updatedAt'],
  //     where: {
  //       userId,
  //       ...this.getUpdatedAtFilter(sliderPropsFilterDto),
  //       sliderProp: {is: {chatId: sliderPropsFilterDto.chatId} },
  //     },
  //     orderBy: { updatedAt: Prisma.SortOrder.desc },
  //   });
  // }
}
