import { ApiProperty } from '@nestjs/swagger';


export class CreateStepChatMessageDto {
  @ApiProperty({ description: "Identifier of the chat message associated with the StepChatMessage", format: 'uuid' })
  chatMessageId: string;

  @ApiProperty({ description: "Identifier of the user associated with the StepChatMessage", format: 'uuid' })
  userId: string;

  @ApiProperty({ description: "Identifier of the chat associated with the StepChatMessage", format: 'uuid' })
  chatId: string;

  @ApiProperty({ description: "Identifier of the message choice associated with the StepChatMessage", required: false, type: String, format: 'uuid' })
  messageChoiceId?: string;

  @ApiProperty({ description: "Answer associated with the StepChatMessage", required: false, type: String })
  answer?: string;

  @ApiProperty({ description: "Challenge time associated with the StepChatMessage", required: false, type: String })
  challengeTime?: number;

  @ApiProperty({ description: "Time spent associated with the StepChatMessage", required: false, type: String })
  timeSpent?: number;

  nextChatMessageId?: string | null
}