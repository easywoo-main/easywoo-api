import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({ description: 'The name of the chat' })
  name: string;

  @ApiProperty({ description: 'The price of the chat' })
  price: number;

  @ApiProperty({ description: 'The number of free steps available in the chat' })
  freeSteps: number;

  @ApiProperty({description: "Landing page URL"})
  landingUrl?: string;

  @ApiProperty({description: "One to one consultation"})
  hasIndividualConsultation: boolean;

  @ApiProperty({description: "Course enabled / disabled"})
  isDisabled: boolean;
}