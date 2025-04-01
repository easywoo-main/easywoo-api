import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { GenerateReportSectionInterface } from '../../generateReportSection.interface';
import { QuestionnaireDto } from '../../../question/dtos/questionnaire.dto';
import { timeout } from 'rxjs';

@Injectable()
export class TargetAudienceService implements GenerateReportSectionInterface {
  name: string = 'Who are you aiming to woo?';
  generateReportSection(userId: string, questionnaire: QuestionnaireDto): Promise<string> {
    return new Promise((resolve) => {
      return 'test';
    });
  }
  getName(): string {
    return this.name;
  }
}
