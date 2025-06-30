import { ApiProperty } from "@nestjs/swagger";
import { StepChatMessage } from '@prisma/client';

export class StepChatMessageEntity implements StepChatMessage {
    @ApiProperty({ description: "Identifier of the chat associated with the StepChatMessage", format: 'uuid' })
    chatId: string;

    @ApiProperty({ description: "Identifier of the message choice", format: 'uuid' })
    messageChoiceId: string;

    @ApiProperty({ description: "User's answer to the chat message" })
    answer: string;

    @ApiProperty({ description: "Time when the challenge was presented (ISO 8601 string)" })
    challengeTime: string;

    @ApiProperty({ description: "Time spent on the step (in seconds or ISO 8601 duration)" })
    timeSpent: string;

    @ApiProperty({ description: "Unique identifier for the StepChatMessage", format: 'uuid' })
    id: string;

    @ApiProperty({ description: "Identifier of the user associated with the StepChatMessage", format: 'uuid' })
    userId: string;

    @ApiProperty({ description: "Identifier of the chat message associated with the StepChatMessage", format: 'uuid' })
    chatMessageId: string;

    @ApiProperty({ description: "Timestamp when the StepChatMessage was created", type: String, format: 'date-time' })
    createdAt: Date;

    @ApiProperty({ description: "Timestamp when the StepChatMessage was last updated", type: String, format: 'date-time' })
    updatedAt: Date;
}