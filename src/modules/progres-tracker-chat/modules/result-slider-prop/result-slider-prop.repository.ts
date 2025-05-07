import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateResultSliderPropDtoWithUserId } from './dtos/createResultSliderPropWithUserId.dto';
import { ResultSliderPropEntity } from './result-slider-prop.entity';

@Injectable()
export class ResultSliderPropRepository {

  constructor(private readonly prisma: PrismaService) {
  }

  public async createResultSliderProp(data: CreateResultSliderPropDtoWithUserId): Promise<ResultSliderPropEntity> {
    return this.prisma.resultSliderProp.create({
      data
    });
  }

  public async createManyResultSliderProp(data: CreateResultSliderPropDtoWithUserId[]): Promise<ResultSliderPropEntity[]> {
    return this.prisma.resultSliderProp.createManyAndReturn({
      data
    });
  }

  public async getResultSliderPropsByUserId(userId: string): Promise<ResultSliderPropEntity[]>{
    return this.prisma.resultSliderProp.findMany({where: {userId}});
  }
}
