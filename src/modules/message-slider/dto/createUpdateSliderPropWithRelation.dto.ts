import { CreateUpdateSliderPropDto } from '../../chat-message/dto/createUpdateSliderProp.dto';

export class CreateUpdateSliderPropWithRelationDto extends CreateUpdateSliderPropDto {
  chatMessageId: string;
}