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
import { ReportDto } from './dto/report.dto';

@Injectable()
export class ReportService {
  private generateReportSectionInterfaces: GenerateReportSectionInterface[];

  constructor(
    private readonly questionnaireService: QuestionService,

    // Inject all the services that implement the GenerateReportSectionInterface
    private readonly introService: IntroService,
    private readonly userIntroductionService: UserIntroductionService,
    private readonly targetAudienceService: TargetAudienceService,
    private readonly relationshipGoalsService: RelationshipGoalsService,
    private readonly finalConsiderationsService: FinalConsiderationsService,
    private readonly emotionalBaggageService: EmotionalBaggageService,
    private readonly deepDiveService: DeepDiveService,
  ) {
    this.generateReportSectionInterfaces = [
      this.introService,
      this.userIntroductionService,
      this.targetAudienceService,
      this.relationshipGoalsService,
      this.finalConsiderationsService,
      this.emotionalBaggageService,
      this.deepDiveService,
    ];
  }
  public async generateReport(userId: string): Promise<ReportDto[]> {
    const questions = await this.questionnaireService.getAllQuestions(userId);

    const questionnaire = new QuestionnaireDto();

    for (const question of questions) {
      for (const answer of question.answers) {
        console.log(`question: ${question.name}, answer: ${answer.name}, isAnswered: ${answer.isAnswered}`);
        (questionnaire[question.name] ??= {})[answer.name] = answer.isAnswered;
      }
    }

    return this.generateReportSectionInterfaces.map((generateReportSectionInterface) => {
      return {
        name: generateReportSectionInterface.getName(),
        content: generateReportSectionInterface.generateReportSection(questionnaire),
      };
    });
  }
}
