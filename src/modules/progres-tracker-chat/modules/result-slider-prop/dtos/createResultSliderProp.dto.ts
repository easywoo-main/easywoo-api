
import { ApiProperty } from '@nestjs/swagger';

export class CreateResultSliderPropDto {
  @ApiProperty({ description: 'The ID of the slider property', format: 'uuid' })
  sliderPropId: string;

  @ApiProperty({ description: 'The result value', example: '10' })
  result: string;
}