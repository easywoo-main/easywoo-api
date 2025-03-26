import { Module } from '@nestjs/common';
import { FinalConsiderationsService } from './final-considerations.service';

@Module({
  providers: [FinalConsiderationsService],
})
export class FinalConsiderationsModule {}
