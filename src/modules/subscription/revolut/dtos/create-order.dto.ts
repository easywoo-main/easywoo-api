import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderResponseDto {
  @ApiProperty({ description: 'Order ID', example: '12345' })
  id: string;

  @ApiProperty({ description: 'Chat ID', example: '67890' })
  chatId: string;

  @ApiProperty({ description: 'User ID', example: 'abcde' })
  userId: string;
}