import { Module } from '@nestjs/common';
import { DeepDiveService } from './deep-dive.service';
import { SentenceModule } from '../sentence/sentence.module';
import { EvaluatorModule } from '../evaluator/evaluator.module';

@Module({
  providers: [DeepDiveService],
  exports: [DeepDiveService],
  imports: [SentenceModule, EvaluatorModule],
})
export class DeepDiveModule {}
