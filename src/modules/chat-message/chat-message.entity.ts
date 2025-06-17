import { $Enums, ChatMessage, MessageType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ChatMessageEntity implements ChatMessage {
    @ApiProperty({ description: 'Unique identifier of the chat message', format: 'uuid' })
    id: string;

    @ApiProperty({ description: 'Step to go to after this message', example: 2, required: false })
    goToStep: number;

    @ApiProperty({ description: 'Step to restart from', example: 1, required: false })
    restartFrom: number;

    @ApiProperty({ description: 'ID of the related slider property',  format: 'uuid', required: false })
    sliderPropId: string;

    @ApiProperty({ description: 'ID of the next chat message',  format: 'uuid', required: false })
    nextMessageId: string;

    @ApiProperty({ description: 'Date when the message was created' })
    createdAt: Date;

    @ApiProperty({ description: 'Date when the message was last updated' })
    updatedAt: Date;

    @ApiProperty({ description: 'Name of the step', example: 'Introduction' })
    stepName: string;

    @ApiProperty({ description: 'Introductory text for the message', example: 'Welcome to the chat!', required: false })
    introText: string;

    @ApiProperty({ description: 'Array of intro image URLs', type: [String], required: false })
    introImages: string[];

    @ApiProperty({ description: 'Array of intro media URLs', type: [String], required: false })
    introMedias: string[];

    @ApiProperty({ description: 'List of todo items', type: [String], required: false })
    todoList: string[];

    @ApiProperty({ description: 'Array of image URLs', type: [String], required: false })
    images: string[];

    @ApiProperty({ description: 'Array of media URLs', type: [String], required: false })
    medias: string[];

    @ApiProperty({ description: 'Question text', example: 'What is your name?' })
    question: string;

    @ApiProperty({ description: 'Type of the message', enum: MessageType })
    type: MessageType;

    @ApiProperty({ description: 'Timeouts in seconds', type: [Number], required: false })
    timeouts: number[];

    @ApiProperty({ description: 'Is manual time allowed', example: true })
    isAllowManualTime: boolean;

    @ApiProperty({ description: 'Is this the end of the course', example: false })
    isCourseEnd: boolean;

    @ApiProperty({ description: 'Is offer to restart available', example: false })
    isOfferRestart: boolean;

    @ApiProperty({ description: 'Is this a comment message', example: false })
    isComment: boolean;

    @ApiProperty({ description: 'Is this a barometer message', example: false })
    isBarometer: boolean;

    @ApiProperty({ description: 'ID of the related chat', format: 'uuid' })
    chatId: string;

    @ApiProperty({ description: 'ID of the restart message', format: 'uuid', required: false })
    restartMessageId: string;

    @ApiProperty({ description: 'Step ID', example: 5, })
    stepId: number;

    @ApiProperty({ description: 'Is this a graph message', example: false })
    isGraph: boolean;
}