import { Module } from '@nestjs/common';
import { UserIntroductionService } from './user-introduction.service';
import { SentenceModule } from '../sentence/sentence.module';
import { EvaluatorModule } from '../evaluator/evaluator.module';

@Module({
  providers: [UserIntroductionService],
  exports: [UserIntroductionService],
  imports: [SentenceModule, EvaluatorModule],
})
export class UserIntroductionModule {}
