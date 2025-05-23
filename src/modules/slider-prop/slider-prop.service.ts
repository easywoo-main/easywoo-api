import { Injectable } from '@nestjs/common';
import { SliderPropRepository } from './slider-prop.repository';
import { SliderPropEntity } from './sliderProp.entity';

@Injectable()
export class SliderPropService {

  constructor(private readonly sliderPropRepository: SliderPropRepository) {}
  public async getAllSliderProps(chatId: string) {
    return this.sliderPropRepository.getAllSliderProps(chatId);
  }
}
