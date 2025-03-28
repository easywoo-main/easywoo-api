import { Module } from '@nestjs/common';
import { RelationshipGoalsService } from './relationship-goals.service';

@Module({
  providers: [RelationshipGoalsService],
  exports: [RelationshipGoalsService],
})
export class RelationshipGoalsModule {}
