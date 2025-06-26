export class RevolutCreateOrderResponseDto {
  id: string;
  public_id: string;
  type: string;
  state: string;
  created_at: string;
  updated_at: string;
  capture_mode: string;
  order_amount: { value: number; currency: string };
  order_outstanding_amount: { value: number; currency: string };
  metadata: Record<string, unknown>;
  checkout_url: string;
}