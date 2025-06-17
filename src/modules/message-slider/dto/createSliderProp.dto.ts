import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SliderPropType } from '@prisma/client';

export class CreateSliderPropDto {
  @ApiProperty({ description: 'Name of the slider property', example: 'Slider Name' })
  name: string;

  @ApiProperty({ description: 'Text of the slider property', example: 'Slider Text' })
  text: string;

  @ApiProperty({
    description: 'Type of the slider property',
    enum: SliderPropType,
  })
  type: SliderPropType;

  @ApiPropertyOptional({ description: 'Positive message' })
  positiveMessage: string;

  @ApiPropertyOptional({ description: 'Negative message', example: 'Slider Description' })
  negativeMessage: string;

  @ApiProperty({
    description: 'Identifier of the chat message associated with this slider',
    format: 'uuid',
  })
  chatId: string;
}