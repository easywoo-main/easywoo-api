import { StepChatMessage } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class StepChatMessageEntity implements StepChatMessage {
    @ApiProperty({ description: "Unique identifier for the StepChatMessage", format: 'uuid' })
    id: string;

    @ApiProperty({ description: "Identifier of the user associated with the StepChatMessage",format: 'uuid' })
    userId: string;

    @ApiProperty({ description: "Identifier of the chat message associated with the StepChatMessage",format: 'uuid' })
    chatMessageId: string;

    @ApiProperty({ description: "Timestamp when the StepChatMessage was created" })
    createdAt: Date;

    @ApiProperty({ description: "Timestamp when the StepChatMessage was last updated" })
    updatedAt: Date;
}