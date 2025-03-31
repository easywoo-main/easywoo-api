import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { GenerateReportSectionInterface } from '../generateReportSection.interface';
import { QuestionnaireDto } from '../../question/dtos/questionnaire.dto';

@Injectable()
export class DeepDiveService implements GenerateReportSectionInterface {
  name: string = "Scratching beneath the surface";
  generateReportSection(questionnaire: QuestionnaireDto): string {
    return 'test';
  }
  getName(): string {
    return this.name;
  }
}
