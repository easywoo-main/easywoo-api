import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { GenerateReportSectionInterface } from '../generateReportSection.interface';
import { QuestionnaireDto } from '../../question/dtos/questionnaire.dto';

@Injectable()
export class RelationshipGoalsService implements GenerateReportSectionInterface {
  name: string;
  generateReportSection(questionnaire: QuestionnaireDto): string {
    throw new MethodNotAllowedException('Method not implemented.');
  }
}
