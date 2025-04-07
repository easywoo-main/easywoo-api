import { Module } from '@nestjs/common';
import { CarePlanService } from './care-plan.service';
import { EvaluatorModule } from '../evaluator/evaluator.module';

@Module({
  providers: [CarePlanService],
  imports: [EvaluatorModule],
})
export class CarePlanModule {}
