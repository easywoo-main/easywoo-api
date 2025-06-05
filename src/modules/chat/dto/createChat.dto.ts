import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateSliderPropDto } from '../../message-slider/dto/createSliderProp.dto';
import { GraphType } from '@prisma/client';

export class CreateChatDto {
  @ApiProperty({ description: 'The name of the chat' })
  name: string;

  @ApiProperty({ description: 'The price of the chat' })
  price: number;

  @ApiProperty({ description: 'The number of free steps available in the chat' })
  freeSteps: number;

  @ApiProperty({description: "Landing page URL"})
  landingUrl?: string;

  @ApiProperty({description: "One to one consultation"})
  hasIndividualConsultation: boolean;

  @ApiProperty({description: "Course enabled / disabled"})
  isDisabled: boolean;

  @ApiProperty({
    description: 'List of slider properties associated with the message',
    type: [CreateSliderPropDto],
  })
  sliderProps: CreateSliderPropDto[];

  @ApiProperty({description: "Formula"})
  formula: string;

  @ApiProperty({description: "Master Graph Name"})
  masterGraph: string;

  @ApiPropertyOptional({description: "Therapist avatar URL"})
  therapistAvatar: string

  @ApiProperty({description: "Therapist name"})
  therapistName: string;
  
  @ApiProperty({ description: 'List of paint points associated with the chat' })
  paintPoints: string[];
}