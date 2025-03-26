import { Module } from '@nestjs/common';
import { RelationshipGoalsService } from './relationship-goals.service';

@Module({
  providers: [RelationshipGoalsService],
})
export class RelationshipGoalsModule {}
