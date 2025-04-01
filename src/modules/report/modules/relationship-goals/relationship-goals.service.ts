import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { GenerateReportSectionInterface } from '../../generateReportSection.interface';
import { QuestionnaireDto } from '../../../question/dtos/questionnaire.dto';
import { timeout } from 'rxjs';

@Injectable()
export class RelationshipGoalsService implements GenerateReportSectionInterface {
  name: string = 'Clearing up your relationship goals';
  generateReportSection(userId: string, questionnaire: QuestionnaireDto): Promise<string> {
    return new Promise((resolve) => {
      return 'test';
    });
  }
  getName(): string {
    return this.name;
  }
}
