import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SliderPropType } from '@prisma/client';

export class CreateUpdateSliderPropDto {
  @ApiPropertyOptional({ description: 'ID of the slider property (optional)', format: 'uuid' })
  id?: string;

  @ApiProperty({ description: 'Name of the slider property', example: 'Slider Name' })
  name: string;

  @ApiProperty({ description: 'Text of the slider property', example: 'Slider Text' })
  text: string;

  @ApiProperty({
    description: 'Type of the slider property',
    enum: SliderPropType,
    example: SliderPropType.POSITIVE,
  })
  type: SliderPropType;

  @ApiPropertyOptional({ description: 'Positive message' })
  positiveMessage: string;

  @ApiPropertyOptional({ description: 'Negative message', example: 'Slider Description' })
  negativeMessage: string;
}