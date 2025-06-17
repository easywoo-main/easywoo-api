import { Module, Post } from '@nestjs/common';
import { CarePlanService } from './care-plan.service';
import { EvaluatorModule } from '../evaluator/evaluator.module';
import { SentenceModule } from '../sentence/sentence.module';
import { CourseModule } from 'src/modules/course/course.module';

@Module({
  providers: [CarePlanService],
  imports: [EvaluatorModule, SentenceModule, CourseModule],
  exports: [CarePlanService],
})
export class CarePlanModule {}
