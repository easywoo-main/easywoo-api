import { Module } from '@nestjs/common';
import { DeepDiveService } from './deep-dive.service';

@Module({
  providers: [DeepDiveService],
  exports: [DeepDiveService],
})
export class DeepDiveModule {}
