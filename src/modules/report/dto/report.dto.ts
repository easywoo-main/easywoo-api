import { ReportSectionDto } from './reportSection.dto';
import { CarePlanDto } from './carePlan.dto';

export class ReportDto {
  reportSection: ReportSectionDto[];
  carePlan: CarePlanDto;
}
