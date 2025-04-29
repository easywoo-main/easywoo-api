import { Module } from '@nestjs/common';
import { MessageSliderController } from './message-slider.controller';
import { MessageSliderService } from './message-slider.service';
import { MessageSliderRepository } from './message-slider.repository';

@Module({
  controllers: [MessageSliderController],
  providers: [MessageSliderService, MessageSliderRepository],
  exports: [MessageSliderService]
})
export class MessageSliderModule {}
