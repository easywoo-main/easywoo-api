import { ApiProperty } from '@nestjs/swagger';


export class CreateStepChatMessageDto {
  @ApiProperty({ description: "Identifier of the chat message associated with the StepChatMessage",format: 'uuid' })
  chatMessageId: string;
}