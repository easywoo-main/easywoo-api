import { ApiProperty } from '@nestjs/swagger';
import { ReportSectionDto } from './reportSection.dto';
import { CarePlanDto } from './carePlan.dto';
import { PdfLocationDto } from '../modules/pdf/dto/pdfLocation.dto';

export class ReportDto {
  @ApiProperty({description: 'Report ID'})
  reportId: string

  @ApiProperty({ type: [ReportSectionDto], description: 'List of report sections' })
  reportSection: ReportSectionDto[];

  @ApiProperty({ type: [CarePlanDto], description: 'List of care plans' })
  carePlan: CarePlanDto[];

  @ApiProperty({ type: PdfLocationDto, description: 'PDF location details' })
  file: PdfLocationDto
}
