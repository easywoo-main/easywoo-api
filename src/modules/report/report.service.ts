import { Injectable } from '@nestjs/common';
import { QuestionService } from '../question/question.service';
import { GenerateReportSectionInterface } from './generateReportSection.interface';
import { UserIntroductionService } from './user-introduction/user-introduction.service';
import { TargetAudienceService } from './target-audience/target-audience.service';
import { RelationshipGoalsService } from './relationship-goals/relationship-goals.service';
import { IntroService } from './intro/intro.service';
import { FinalConsiderationsService } from './final-considerations/final-considerations.service';
import { EmotionalBaggageService } from './emotional-baggage/emotional-baggage.service';
import { DeepDiveService } from './deep-dive/deep-dive.service';
import { QuestionnaireDto } from '../question/dtos/questionnaire.dto';

@Injectable()
export class ReportService {
  private generateReportSectionInterfaces: GenerateReportSectionInterface[];

  constructor(
    private readonly questionnaireService: QuestionService,

    // Inject all the services that implement the GenerateReportSectionInterface
    private readonly userIntroductionService: UserIntroductionService,
    private readonly targetAudienceService: TargetAudienceService,
    private readonly relationshipGoalsService: RelationshipGoalsService,
    private readonly introService: IntroService,
    private readonly finalConsiderationsService: FinalConsiderationsService,
    private readonly emotionalBaggageService: EmotionalBaggageService,
    private readonly deepDiveService: DeepDiveService,
  ) {
    this.generateReportSectionInterfaces = [
      this.userIntroductionService,
      this.targetAudienceService,
      this.relationshipGoalsService,
      this.introService,
      this.finalConsiderationsService,
      this.emotionalBaggageService,
      this.deepDiveService,
    ];
  }
  public async generateReport(questionnaire: QuestionnaireDto, userId: string) {
    const questions = await this.questionnaireService.getAllQuestions(userId);

    const result = this.generateReportSectionInterfaces.map((generateReportSectionInterface) => {
      return generateReportSectionInterface.generateReportSection(questionnaire);
    });
  }
}
