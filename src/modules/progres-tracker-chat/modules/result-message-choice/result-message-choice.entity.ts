import { ResultMessageChoice } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ResultMessageChoiceEntity implements ResultMessageChoice {
    @ApiProperty({ description: 'Unique identifier of the result message choice', format: 'uuid' })
    id: string;

    @ApiProperty({ description: 'Identifier of the user associated with the result message choice', format: 'uuid' })
    userId: string;

    @ApiProperty({ description: 'Identifier of the message choice', format: 'uuid' })
    messageChoiceId: string;

    @ApiProperty({ description: 'Timestamp when the result message choice was created' })
    createdAt: Date;

    @ApiProperty({ description: 'Timestamp when the result message choice was last updated' })
    updatedAt: Date;
}