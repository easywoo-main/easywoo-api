import { ApiProperty } from '@nestjs/swagger';
import { ReportSectionDto } from './reportSection.dto';
import { CarePlanDto } from './carePlan.dto';

export class ReportDto {
  @ApiProperty({ type: [ReportSectionDto], description: 'List of report sections' })
  reportSection: ReportSectionDto[];

  @ApiProperty({ type: [CarePlanDto], description: 'List of care plans' })
  carePlan: CarePlanDto[];
}
