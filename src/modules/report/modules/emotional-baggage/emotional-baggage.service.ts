import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { GenerateReportSectionInterface } from '../../generateReportSection.interface';
import { QuestionnaireDto } from '../../../question/dtos/questionnaire.dto';

@Injectable()
export class EmotionalBaggageService implements GenerateReportSectionInterface {
  name: string = 'What about the baggage?';
  generateReportSection(userId: string, questionnaire: QuestionnaireDto): Promise<string> {
    return new Promise((resolve) => {
      resolve('test');
    });
  }
  getName(): string {
    return this.name;
  }
}
