import { Module } from '@nestjs/common';
import { TargetAudienceService } from './target-audience.service';

@Module({
  providers: [TargetAudienceService],
  exports: [TargetAudienceService],
})
export class TargetAudienceModule {}
