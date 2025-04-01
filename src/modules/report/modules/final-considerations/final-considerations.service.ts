import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { GenerateReportSectionInterface } from '../../generateReportSection.interface';
import { QuestionnaireDto } from '../../../question/dtos/questionnaire.dto';

@Injectable()
export class FinalConsiderationsService implements GenerateReportSectionInterface {
  name: string = 'Last but not least…';
  generateReportSection(userId: string, questionnaire: QuestionnaireDto): Promise<string> {
    return new Promise((resolve) => {
      resolve('test');
    });
  }
  getName(): string {
    return this.name;
  }
}
