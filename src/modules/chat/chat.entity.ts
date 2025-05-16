import { ApiProperty } from '@nestjs/swagger';
import { Chat } from '@prisma/client';

export class ChatEntity implements Chat {
  @ApiProperty({description: "Landing page URL"})
  landingUrl: string;

  @ApiProperty({description: "One to one consultation"})
  hasIndividualConsultation: boolean;

  @ApiProperty({description: "Course enabled / disabled"})
  isDisabled: boolean;

  @ApiProperty({ description: 'Unique identifier of the chat', format: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Name of the chat' })
  name: string;

  @ApiProperty({ description: 'The price of the chat' })
  price: number;

  @ApiProperty({ description: 'The number of free steps available in the chat' })
  freeSteps: number;

  @ApiProperty({ description: 'Formula' })
  formula: string;

  @ApiProperty({ description: 'ID of the starting message in the chat', format: 'uuid' })
  startMessageId: string;

  @ApiProperty({ description: 'Timestamp when the chat was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the chat was last updated' })
  updatedAt: Date;
}