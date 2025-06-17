import { $Enums, SliderProp } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class MessageSliderEntity implements SliderProp {
    positiveMessage: string;
    negativeMessage: string;
    @ApiProperty({ description: 'The text of the slider' })

    text: string;
    @ApiProperty({ description: 'The name of the slider' })
    name: string;

    @ApiProperty({ description: 'The unique identifier of the slider' })
    id: string;

    @ApiProperty({ description: 'The type of the slider', enum: $Enums.SliderPropType })
    type: $Enums.SliderPropType;

    @ApiProperty({ description: 'The date the slider was created' })
    createdAt: Date;

    @ApiProperty({ description: 'The date the slider was last updated' })
    updatedAt: Date;

    @ApiProperty({ description: 'The ID of the related chat ', format:"uuid" })
    chatId: string;

}