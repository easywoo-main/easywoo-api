import { CreateMessageChoiceDto } from './createMessageChoice.dto';

export class CreateMessageChoiceWithGoToStepDto extends CreateMessageChoiceDto {
  goToStep: number;

}

