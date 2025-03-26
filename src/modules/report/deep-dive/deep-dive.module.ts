import { Module } from '@nestjs/common';
import { DeepDiveService } from './deep-dive.service';

@Module({
  providers: [DeepDiveService],
})
export class DeepDiveModule {}
