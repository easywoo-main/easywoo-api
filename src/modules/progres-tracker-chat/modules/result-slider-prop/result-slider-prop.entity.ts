import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateResultSliderPropDto } from './dto/createResultSliderProp.dto';

@Injectable()
export class ResultSliderPropRepository {

  constructor(private readonly prisma: PrismaService) {
  }

  public async createResultSliderProp(data: CreateResultSliderPropDto) {
    return this.prisma.resultSliderProp.create({
      data
    });
  }

  public async createManyResultSliderProp(data: CreateResultSliderPropDto) {
    return this.prisma.resultSliderProp.createManyAndReturn({
      data
    });
  }

  public async getResultSliderPropsByUserId(userId: string){
    return this.prisma.resultSliderProp.findMany({where: {userId}});  }

}
