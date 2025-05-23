import { SliderPropRepository } from './slider-prop.repository';
import { $Enums, SliderProp } from '@prisma/client';

export class SliderPropEntity implements SliderProp {
    name: string;
    id: string;
    text: string;
    type: $Enums.SliderPropType;
    positiveMessage: string;
    negativeMessage: string;
    createdAt: Date;
    updatedAt: Date;
    chatId: string;
}