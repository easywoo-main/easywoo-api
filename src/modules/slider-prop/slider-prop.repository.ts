import { Injectable } from '@nestjs/common';
import { Repository } from '../../database/repository.service';
import { Prisma } from '.prisma/client';
import { SliderPropEntity } from './sliderProp.entity';

@Injectable()
export class SliderPropRepository {
  private readonly sliderPropRepository: Prisma.SliderPropDelegate;

  constructor(repository: Repository) {
    this.sliderPropRepository = repository.sliderProp;
  }
  public async getAllSliderProps(chatId: string): Promise<SliderPropEntity[]> {
    return this.sliderPropRepository.findMany(
      {where: {chatId}},
    );
  }
}
