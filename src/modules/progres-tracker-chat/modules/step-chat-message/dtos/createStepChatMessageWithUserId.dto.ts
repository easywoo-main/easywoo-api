import { ApiProperty } from '@nestjs/swagger';
import { CreateStepChatMessageDto } from './createStepChatMessage.dto';


export class CreateStepChatMessageDtoWithUserId extends CreateStepChatMessageDto {
  @ApiProperty({ description: "Identifier of the user associated with the StepChatMessage",format: 'uuid' })
  userId: string;
}
