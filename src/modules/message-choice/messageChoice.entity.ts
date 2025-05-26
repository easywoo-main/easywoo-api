import { ApiProperty } from '@nestjs/swagger';
import {MessageChoice } from '@prisma/client';

export class MessageChoiceEntity implements MessageChoice {
    text: string;
    infoText: string;
    // @ApiProperty({ description: 'The name of the message choice' })
    // name: string;

    @ApiProperty({ description: 'The unique identifier of the message choice', format: 'uuid' })
    id: string;

    @ApiProperty({ description: 'The file associated with the message choice' })
    file: string;

    @ApiProperty({ description: 'The ID of the previous message', format: 'uuid', nullable: true })
    prevMessageId: string;

    @ApiProperty({ description: 'The ID of the next message', format: 'uuid', nullable: true })
    nextMessageId: string;

    @ApiProperty({ description: 'The date when the message choice was created', type: 'string', format: 'date-time' })
    createdAt: Date;

    @ApiProperty({ description: 'The date when the message choice was last updated', type: 'string', format: 'date-time' })
    updatedAt: Date;
}
