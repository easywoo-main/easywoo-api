import { ApiProperty } from '@nestjs/swagger';
import { CreateResultSliderPropDto } from '../../progres-tracker-chat/modules/result-slider-prop/dtos/createResultSliderProp.dto';

export class CreateUserStepDto {
  @ApiProperty({
    description: 'current step',
    format: 'uuid',
    required: true,
  })
  chatMessageId: string;

  @ApiProperty({
    description: 'ID of the selected message choice',
    required: false,
    format: "uuid",
  })
  messageChoiceId?: string;

  @ApiProperty({
    description: 'Array of slider properties for the result',
    required: false,
    type: [CreateResultSliderPropDto],
  })
  sliderProps?: CreateResultSliderPropDto[];

  @ApiProperty({
    description: 'Text answer provided by the user',
    required: false,
    type: String,
  })
  textAnswer?: string;

  @ApiProperty({
    description: 'Message id to which the user should be returned',
    format: 'uuid',
    required: false,
  })
  restartMessageId?: string;

}