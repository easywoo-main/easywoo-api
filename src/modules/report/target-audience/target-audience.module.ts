import { Module } from '@nestjs/common';
import { TargetAudienceService } from './target-audience.service';

@Module({
  providers: [TargetAudienceService],
})
export class TargetAudienceModule {}
