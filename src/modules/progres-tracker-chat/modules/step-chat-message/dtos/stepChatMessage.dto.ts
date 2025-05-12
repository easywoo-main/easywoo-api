import { StepChatMessageEntity } from "../step-chat-message.entity";
import { UserEntity } from '../../../../user/user.entity';

export class StepChatMessageDto extends StepChatMessageEntity {
  user: UserEntity;
}