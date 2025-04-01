import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { GenerateReportSectionInterface } from '../../generateReportSection.interface';
import { QuestionnaireDto } from '../../../question/dtos/questionnaire.dto';
import { timeout } from 'rxjs';

@Injectable()
export class IntroService implements GenerateReportSectionInterface {
  name: string = 'Personal profile of: ';
  generateReportSection(userId: string, questionnaire: QuestionnaireDto): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve('Hello and welcome to easyWoo. You are now a step closer to the relationship that you are aiming for. Let us guide you through this process. Read on');
    });
  }
  getName(): string {
    return this.name + 'questions';
  }
}
