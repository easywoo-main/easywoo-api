export class CreateOrderRequestDto {
  chatId: string;
  redirectUrl: string;
  currency: string = 'USD';
}  