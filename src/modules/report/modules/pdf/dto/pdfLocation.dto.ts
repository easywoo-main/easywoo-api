import { ApiProperty } from '@nestjs/swagger';

export class PdfLocationDto {
  @ApiProperty({
    description: 'The URL of the generated PDF report',
    example: 'https://example.com/report/123e4567-e89b-12d3-a456-426614174000.pdf',
  })
  location: URL;
}