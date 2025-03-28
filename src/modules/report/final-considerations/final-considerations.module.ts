import { Module } from '@nestjs/common';
import { FinalConsiderationsService } from './final-considerations.service';

@Module({
  providers: [FinalConsiderationsService],
  exports: [FinalConsiderationsService],
})
export class FinalConsiderationsModule {}
