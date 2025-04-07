import { Module, Post } from '@nestjs/common';
import { CarePlanService } from './care-plan.service';
import { EvaluatorModule } from '../evaluator/evaluator.module';
import { SentenceModule } from '../sentence/sentence.module';
import { PostModule } from 'src/modules/post/post.module';

@Module({
  providers: [CarePlanService],
  imports: [EvaluatorModule, SentenceModule, PostModule],
  exports: [CarePlanService],
})
export class CarePlanModule {}
