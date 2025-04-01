import { QuestionnaireDto } from '../question/dtos/questionnaire.dto';

export interface GenerateReportSectionInterface {
  generateReportSection(userId: string, questionnaire: QuestionnaireDto): Promise<string>;
  getName(): string;
}
