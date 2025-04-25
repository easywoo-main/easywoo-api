import { SliderPropType } from '@prisma/client';

export class CreateUpdateSliderPropDto {
  name: string;
  type: SliderPropType;
}