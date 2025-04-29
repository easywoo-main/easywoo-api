import { SliderPropType } from '@prisma/client';

export class CreateUpdateSliderPropDto {
  id?: string
  name: string;
  type: SliderPropType;
}