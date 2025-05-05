import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { QuestionModule } from '../question/question.module';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';
import { SentenceModule } from './modules/sentence/sentence.module';
import { CarePlanModule } from './modules/care-plan/care-plan.module';
import { EvaluatorModule } from './modules/evaluator/evaluator.module';
import { PdfModule } from './modules/pdf/pdf.module';
import { EasywooApiModule } from './modules/easywoo-api/easywoo-api.module';

@Module({
  providers: [ReportService],
  exports: [ReportService],
  imports: [QuestionModule, TokenModule, UserModule, SentenceModule, CarePlanModule, EvaluatorModule, PdfModule, EasywooApiModule],
})
export class ReportModule {}
