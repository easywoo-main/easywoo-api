import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { UserIntroductionModule } from './modules/user-introduction/user-introduction.module';
import { RelationshipGoalsModule } from './modules/relationship-goals/relationship-goals.module';
import { DeepDiveModule } from './modules/deep-dive/deep-dive.module';
import { TargetAudienceModule } from './modules/target-audience/target-audience.module';
import { EmotionalBaggageModule } from './modules/emotional-baggage/emotional-baggage.module';
import { IntroModule } from './modules/intro/intro.module';
import { FinalConsiderationsModule } from './modules/final-considerations/final-considerations.module';
import { QuestionModule } from '../question/question.module';
import { EvaluatorModule } from './modules/evaluator/evaluator.module';
import { ReportController } from './report.controller';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';
import { SentenceModule } from './modules/sentence/sentence.module';

@Module({
  providers: [ReportService, SentenceModule, EvaluatorModule],
  exports: [ReportService],
  imports: [
    UserIntroductionModule,
    RelationshipGoalsModule,
    TargetAudienceModule,
    EmotionalBaggageModule,
    FinalConsiderationsModule,
    DeepDiveModule,
    IntroModule,
    QuestionModule,
    EvaluatorModule,
    TokenModule,
    UserModule,
    SentenceModule,
  ],
  controllers: [ReportController],
})
export class ReportModule {}
