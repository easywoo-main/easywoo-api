import { Module } from '@nestjs/common';
import { EmotionalBaggageService } from './emotional-baggage.service';

@Module({
  providers: [EmotionalBaggageService],
})
export class EmotionalBaggageModule {}
