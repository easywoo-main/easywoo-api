import { ApiProperty } from '@nestjs/swagger';
import { ResultSliderProp } from '@prisma/client';

export class ResultSliderPropEntity implements ResultSliderProp {
    @ApiProperty({ format: 'uuid' })
    stepChatMessageId: string;
    @ApiProperty({ description: 'The unique identifier of the result slider prop', format: 'uuid' })
    id: string;

    @ApiProperty({ description: 'The result associated with the slider prop', example: "10" })
    result: string;

    @ApiProperty({ description: 'The unique identifier of the user', format: 'uuid' })
    userId: string;

    @ApiProperty({ description: 'The unique identifier of the slider prop',  format: 'uuid' })
    sliderPropId: string;

    @ApiProperty({ description: 'The date when the record was created' })
    createdAt: Date;

    @ApiProperty({ description: 'The date when the record was last updated' })
    updatedAt: Date;
}