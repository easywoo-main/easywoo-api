import {
  CreateResultSliderPropDto
} from "../../progres-tracker-chat/modules/result-slider-prop/dtos/createResultSliderProp.dto";

export class CreateAnswerDto {
  chatMessageId: string;
  messageChoiceId?: string;
  textAnswer?: string;
  sliderProps?: CreateResultSliderPropDto[]
}