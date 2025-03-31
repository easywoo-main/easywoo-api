import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { GenerateReportSectionInterface } from '../generateReportSection.interface';
import { QuestionnaireDto } from '../../question/dtos/questionnaire.dto';

@Injectable()
export class TargetAudienceService implements GenerateReportSectionInterface {
  name: string = 'Who are you aiming to woo?';
  generateReportSection(questionnaire: QuestionnaireDto): string {
    return 'test';
  }
  getName(): string {
    return this.name;
  }
}
