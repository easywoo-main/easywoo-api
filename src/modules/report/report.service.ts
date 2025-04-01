import { Injectable } from '@nestjs/common';
import { QuestionService } from '../question/question.service';
import { GenerateReportSectionInterface } from './generateReportSection.interface';
import { UserIntroductionService } from './modules/user-introduction/user-introduction.service';
import { TargetAudienceService } from './modules/target-audience/target-audience.service';
import { RelationshipGoalsService } from './modules/relationship-goals/relationship-goals.service';
import { IntroService } from './modules/intro/intro.service';
import { FinalConsiderationsService } from './modules/final-considerations/final-considerations.service';
import { EmotionalBaggageService } from './modules/emotional-baggage/emotional-baggage.service';
import { DeepDiveService } from './modules/deep-dive/deep-dive.service';
import { QuestionnaireDto } from '../question/dtos/questionnaire.dto';
import { ReportDto } from './dto/report.dto';
import { SentenceService } from './modules/sentence/sentence.service';
import { SentenceType } from '@prisma/client';
import { Condition } from './modules/evaluator/condition.dto';
import { EvaluatorService } from './modules/evaluator/evaluator.service';
import { REPORT_SECTIONS } from '../../utils/constants.utils';

@Injectable()
export class ReportService {
  // private generateReportSectionInterfaces: GenerateReportSectionInterface[];

  constructor(
    private readonly questionnaireService: QuestionService,
    private readonly sentenceService: SentenceService,
    private readonly evaluatorService: EvaluatorService,

    // Inject all the services that implement the GenerateReportSectionInterface
    // private readonly introService: IntroService,
    // private readonly userIntroductionService: UserIntroductionService,
    // private readonly targetAudienceService: TargetAudienceService,
    // private readonly relationshipGoalsService: RelationshipGoalsService,
    // private readonly finalConsiderationsService: FinalConsiderationsService,
    // private readonly emotionalBaggageService: EmotionalBaggageService,
    // private readonly deepDiveService: DeepDiveService,
  ) {
    // this.generateReportSectionInterfaces = [
    //   // this.introService,
    //   // this.userIntroductionService,
    //   this.deepDiveService,
    //
    //   // this.targetAudienceService,
    //   // this.relationshipGoalsService,
    //   // this.finalConsiderationsService,
    //   // this.emotionalBaggageService,
    // ];
  }
  public async generateReport(userId: string): Promise<ReportDto[]> {
    const questions = await this.questionnaireService.getAllQuestions(userId);

    const questionnaire: QuestionnaireDto = new QuestionnaireDto();
    //questionnaire
    for (const question of questions) {
      for (const answer of question.answers) {
        (questionnaire[question.name] ??= {})[answer.name] = answer.isAnswered;

        for (const [key, value] of Object.entries(answer.evaluation)) {
          const [mainKey, subKey] = key.split('.');

          if (!questionnaire[mainKey]) {
            questionnaire[mainKey] = {};
          }

          questionnaire[mainKey][subKey] = value;
        }
      }
    }

    return await Promise.all(
      REPORT_SECTIONS.map(async (generateReportSectionInterface) => {
        return {
          name: generateReportSectionInterface.name,
          content: await this.generateReportSection(questionnaire, generateReportSectionInterface.type),
        };
      }),
    );
  }

  private async generateReportSection(questionnaire: QuestionnaireDto, sentenceType: SentenceType): Promise<string> {
    const sentences = await this.sentenceService.getAllSentencesByType(sentenceType);
    let results = '';
    for (const sentence of sentences) {
      if (this.evaluatorService.checkCondition(sentence.condition as Condition, questionnaire.questionnaire)) {
        results += sentence.sentence;
      }
    }
    return results;
  }
}
