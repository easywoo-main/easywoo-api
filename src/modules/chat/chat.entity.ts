import { ApiProperty } from '@nestjs/swagger';
import { Chat } from '@prisma/client';

export class ChatEntity implements Chat {
  @ApiProperty({ description: 'Unique identifier of the chat', format: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Name of the chat' })
  name: string;

  @ApiProperty({ description: 'ID of the starting message in the chat', format: 'uuid' })
  startMessageId: string;

  @ApiProperty({ description: 'Timestamp when the chat was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the chat was last updated' })
  updatedAt: Date;
}