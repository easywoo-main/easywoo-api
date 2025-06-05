import { ApiProperty } from '@nestjs/swagger';
import { SliderProp, SliderPropType } from '@prisma/client';

export class SliderPropEntity implements SliderProp {
    @ApiProperty({ description: 'Unique identifier', format: 'uuid' })
    id: string;

    @ApiProperty({ description: 'Name of the slider property' })
    name: string;

    @ApiProperty({ description: 'Text description' })
    text: string;

    @ApiProperty({ enum: SliderPropType, description: 'Type of the slider property' })
    type: SliderPropType;

    @ApiProperty({ description: 'Message for positive value' })
    positiveMessage: string;

    @ApiProperty({ description: 'Message for negative value' })
    negativeMessage: string;

    @ApiProperty({ description: 'Creation date', type: String, format: 'date-time' })
    createdAt: Date;

    @ApiProperty({ description: 'Last update date', type: String, format: 'date-time' })
    updatedAt: Date;

    @ApiProperty({ description: 'Chat identifier', format: 'uuid' })
    chatId: string;
}