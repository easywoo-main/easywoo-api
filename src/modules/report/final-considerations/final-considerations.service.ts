import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { GenerateReportSectionInterface } from '../generateReportSection.interface';
import { QuestionnaireDto } from '../../question/dtos/questionnaire.dto';

@Injectable()
export class FinalConsiderationsService implements GenerateReportSectionInterface {
  name: string = 'Last but not least…';
  generateReportSection(questionnaire: QuestionnaireDto): string {
    return 'test';
  }
  getName(): string {
    return this.name;
  }
}
