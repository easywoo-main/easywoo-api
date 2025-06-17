import { ApiProperty } from "@nestjs/swagger";
import { Chat } from '@prisma/client';

export class ChatEntity implements Chat {

    @ApiProperty({ description: 'Unique identifier of the chat', format: 'uuid' })
    id: string;

    @ApiProperty({ description: 'Name of the chat', example: 'Therapy Chat' })
    name: string;

    @ApiProperty({ description: 'Number of free steps available in the chat', example: 3 })
    freeSteps: number;

    @ApiProperty({ description: 'Price of the chat', example: 99.99 })
    price: number;

    @ApiProperty({ description: 'Landing page URL for the chat', example: 'https://example.com/landing' })
    landingUrl: string;

    @ApiProperty({ description: 'Indicates if individual consultation is available', example: true })
    hasIndividualConsultation: boolean;

    @ApiProperty({ description: 'Indicates if the chat is disabled', example: false })
    isDisabled: boolean;

    @ApiProperty({ description: 'ID of the start message for the chat', format: 'uuid' })
    startMessageId: string;

    @ApiProperty({ description: 'Formula used in the chat', example: 'happy+angry^2' })
    formula: string;

    @ApiProperty({ description: 'Master graph data for the chat', example: 'Master graph name' })
    masterGraph: string;

    @ApiProperty({ description: 'List of paint points for the chat', example: ['point1', 'point2'] })
    paintPoints: string[];

    @ApiProperty({ description: 'URL of the therapist\'s avatar', example: 'https://example.com/avatar.png' })
    therapistAvatar: string;

    @ApiProperty({ description: 'Name of the therapist', example: 'Dr. Smith' })
    therapistName: string;

    @ApiProperty({ description: 'Date when the chat was created' })
    createdAt: Date;

    @ApiProperty({ description: 'Date when the chat was last updated' })
    updatedAt: Date;
}