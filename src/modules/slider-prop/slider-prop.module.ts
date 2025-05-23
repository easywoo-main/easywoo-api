import { Module } from '@nestjs/common';
import { SliderPropController } from './slider-prop.controller';
import { SliderPropService } from './slider-prop.service';
import { SliderPropRepository } from './slider-prop.repository';

@Module({
  controllers: [SliderPropController],
  providers: [SliderPropService, SliderPropRepository]
})
export class SliderPropModule {}
