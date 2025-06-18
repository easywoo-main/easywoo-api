import { ApiProperty } from '@nestjs/swagger';
import {MessageChoice } from '@prisma/client';

export class MessageChoiceEntity implements MessageChoice {
    @ApiProperty({ description: 'The file associated with the message choice', format: 'url', required: false })
    file: string;

    @ApiProperty({ description: 'The step number to go to after this choice', example: 2, required: false })
    goToStep: number;

    @ApiProperty({ description: 'The main text of the message choice', example: 'Continue' })
    text: string;

    @ApiProperty({ description: 'Additional info text for the message choice', example: 'This will take you to the next step', required: false })
    infoText: string;

    @ApiProperty({ description: 'The unique identifier of the message choice', format: 'uuid', example: 'b3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d' })
    id: string;

    @ApiProperty({ description: 'The ID of the previous message', format: 'uuid', nullable: true, required: false, example: 'a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d' })
    prevMessageId: string;

    @ApiProperty({ description: 'The ID of the next message', format: 'uuid', nullable: true, required: false, example: 'c1d2e3f4-5a6b-7c8d-9e0f-1a2b3c4d5e6f' })
    nextMessageId: string;

    @ApiProperty({ description: 'The date when the message choice was created', type: 'string', format: 'date-time', example: '2024-06-01T12:00:00Z' })
    createdAt: Date;

    @ApiProperty({ description: 'The date when the message choice was last updated', type: 'string', format: 'date-time', example: '2024-06-02T15:30:00Z' })
    updatedAt: Date;
}