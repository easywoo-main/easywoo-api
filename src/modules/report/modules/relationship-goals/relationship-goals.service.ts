import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { GenerateReportSectionInterface } from '../generateReportSection.interface';
import { QuestionnaireDto } from '../../question/dtos/questionnaire.dto';

@Injectable()
export class RelationshipGoalsService implements GenerateReportSectionInterface {
  name: string = 'Clearing up your relationship goals';
  generateReportSection(questionnaire: QuestionnaireDto): string {
    return 'test';
  }
  getName(): string {
    return this.name;
  }
}
