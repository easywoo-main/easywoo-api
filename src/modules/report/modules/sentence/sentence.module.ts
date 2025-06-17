import { Module } from '@nestjs/common';
import { SentenceService } from './sentence.service';
import { SentenceRepository } from './sentence.repository';

@Module({
  providers: [SentenceService, SentenceRepository],
  exports: [SentenceService],
})
export class SentenceModule {}
