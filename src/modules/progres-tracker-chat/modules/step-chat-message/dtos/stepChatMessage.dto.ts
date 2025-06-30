import { StepChatMessageEntity } from "../step-chat-message.entity";
import { MessageChoiceEntity } from "src/modules/message-choice/messageChoice.entity";
import { ChatMessageEntity } from '../../../../chat-message/chat-message.entity';
import { ApiProperty } from '@nestjs/swagger';

export class StepChatMessageDto extends StepChatMessageEntity {
  @ApiProperty({ type: MessageChoiceEntity })
  messageChoice: MessageChoiceEntity;

  @ApiProperty({ type: ChatMessageEntity })
  chatMessage: ChatMessageEntity
}