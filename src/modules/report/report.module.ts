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
import { ReportController } from './report.controller';
import { ReportRepository } from './report.repository';
import { QuestionnaireAnswerModule } from '../question-answer/questionnaire-answer.module';

@Module({
  providers: [ReportService, ReportRepository],
  exports: [ReportService],
  imports: [QuestionModule, TokenModule, UserModule, SentenceModule, CarePlanModule, EvaluatorModule, PdfModule, EasywooApiModule, QuestionnaireAnswerModule],
  controllers: [ReportController]
  // controllers: [ReportController],
})
export class ReportModule {
}
