import { Controller, Get, Query } from '@nestjs/common';
import { SliderPropService } from './slider-prop.service';
import { SliderPropEntity } from './sliderProp.entity';

@Controller('slider-prop')
export class SliderPropController {
  constructor(private readonly sliderPropService: SliderPropService) {
  }

  @Get()
  public async getAllSliderProps(@Query("chatId") chatId: string): Promise<SliderPropEntity[]> {
    return this.sliderPropService.getAllSliderProps(chatId)
  }
}
