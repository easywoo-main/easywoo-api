import { ApiProperty } from '@nestjs/swagger';
import { MessageType } from '@prisma/client';

export class CreateChatMessageDto {
  @ApiProperty({ description: 'Identifier of the parent message', format: 'uuid' })
  parentId: string;

  @ApiProperty({ description: 'Content of the message', example: 'Hello, world!' })
  name: string;

  @ApiProperty({ description: 'Type of the message', enum: MessageType, example: MessageType.TEXT })
  type: MessageType;
}
