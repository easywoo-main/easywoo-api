import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { UserIntroductionModule } from './user-introduction/user-introduction.module';
import { RelationshipGoalsModule } from './relationship-goals/relationship-goals.module';
import { DeepDiveModule } from './deep-dive/deep-dive.module';
import { TargetAudienceModule } from './target-audience/target-audience.module';
import { EmotionalBaggageModule } from './emotional-baggage/emotional-baggage.module';
import { IntroModule } from './intro/intro.module';
import { FinalConsiderationsModule } from './final-considerations/final-considerations.module';
import { QuestionModule } from '../question/question.module';
import { EvaluatorModule } from './evaluator/evaluator.module';
import { ReportController } from './report.controller';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [ReportService],
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
  ],
  controllers: [ReportController],
})
export class ReportModule {}
