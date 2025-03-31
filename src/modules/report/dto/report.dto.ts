import { ApiProperty } from '@nestjs/swagger';

export class ReportDto {
  @ApiProperty({ description: 'The name of the report' })
  name: string;

  @ApiProperty({ description: 'The description of the report' })
  content: string;
}
