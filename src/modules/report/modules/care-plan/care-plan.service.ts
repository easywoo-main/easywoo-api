import { Injectable } from '@nestjs/common';
import { QuestionnaireDto } from '../../../question/dtos/questionnaire.dto';
import { SentenceService } from '../sentence/sentence.service';
import { EvaluatorService } from '../evaluator/evaluator.service';
import { Condition } from '../evaluator/condition.dto';
import { SentenceType, Prisma } from '@prisma/client';
import { CarePlanDto } from '../../dto/carePlan.dto';
import { CourseService } from '../../../course/course.service';

@Injectable()
export class CarePlanService {
  constructor(
    private readonly sentenceService: SentenceService,
    private readonly evaluatorService: EvaluatorService,
    private readonly postService: CourseService,
  ) {}

  public async generateReportSection(questionnaire: QuestionnaireDto): Promise<CarePlanDto[]> {
    const sentences = await this.sentenceService.getAllSentencesByType(SentenceType.CARE_PLAN);
    const results: CarePlanDto[] = [];
    for (const sentence of sentences) {
      if (this.evaluatorService.chekObj(sentence.condition as Condition, questionnaire)) {
        results.push({
          sentence: sentence.sentence,
          course: await this.postService.findRandomPostByFilter(JSON.parse(sentence.dbFindManyArgs as string) as Prisma.CourseFindManyArgs),
        });
      }
    }
    return results;
  }
}
