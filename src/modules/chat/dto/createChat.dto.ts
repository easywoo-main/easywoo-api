import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUpdateSliderPropDto } from '../../chat-message/dto/createUpdateSliderProp.dto';

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
    type: [CreateUpdateSliderPropDto],
  })
  sliderProps: CreateUpdateSliderPropDto[];

  @ApiProperty({description: "Formula"})
  formula: string;

  @ApiPropertyOptional({description: "Therapist avatar URL"})
  therapistAvatar: string

  @ApiProperty({description: "Therapist name"})
  therapistName: string;
}