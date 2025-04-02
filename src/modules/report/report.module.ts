import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { QuestionModule } from '../question/question.module';
import { ReportController } from './report.controller';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';
import { EvaluatorService } from './evaluator.service';
import { SentenceService } from './modules/sentence/sentence.service';
import { SentenceModule } from './modules/sentence/sentence.module';

@Module({
  providers: [ReportService, EvaluatorService],
  exports: [ReportService],
  imports: [QuestionModule, TokenModule, UserModule, SentenceModule],
  controllers: [ReportController],
})
export class ReportModule {}
