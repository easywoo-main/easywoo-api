import { ApiProperty } from '@nestjs/swagger';

export class RevolutCreateOrderResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  public_id: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;

  @ApiProperty()
  capture_mode: string;

  @ApiProperty({ type: () => Object })
  order_amount: { value: number; currency: string };

  @ApiProperty({ type: () => Object })
  order_outstanding_amount: { value: number; currency: string };

  @ApiProperty({ type: Object })
  metadata: Record<string, unknown>;

  @ApiProperty()
  checkout_url: string;
}