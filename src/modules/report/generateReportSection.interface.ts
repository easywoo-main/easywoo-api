import { QuestionnaireDto } from '../question/dtos/questionnaire.dto';

export interface GenerateReportSectionInterface {
  generateReportSection(questionnaire: QuestionnaireDto): string;
  getName(): string;
}
