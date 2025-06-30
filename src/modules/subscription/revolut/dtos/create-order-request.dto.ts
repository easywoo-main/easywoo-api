import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderRequestDto {
  @ApiProperty({ format: 'uuid', description: 'Chat ID of the user' })
  chatId: string;

  @ApiProperty({ example: 'https://example.com/redirect', description: 'URL to redirect after order' })
  redirectUrl: string;

  @ApiProperty({ example: 'USD', description: 'Currency code', default: 'USD' })
  currency: string = 'USD';
}