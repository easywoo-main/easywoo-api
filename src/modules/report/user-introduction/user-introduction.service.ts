import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { GenerateReportSectionInterface } from '../generateReportSection.interface';
import { QuestionnaireDto } from '../../question/dtos/questionnaire.dto';

@Injectable()
export class UserIntroductionService implements GenerateReportSectionInterface {
  name: string = 'Let’s look at you';
  generateReportSection(questionnaire: QuestionnaireDto): string {
    return 'test';
  }

  getName(): string {
    return this.name;
  }
}
