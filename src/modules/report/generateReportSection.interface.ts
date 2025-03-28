import { QuestionnaireDto } from '../question/dtos/questionnaire.dto';

export interface GenerateReportSectionInterface {
  name: string;
  generateReportSection(questionnaire: QuestionnaireDto): string;
}
