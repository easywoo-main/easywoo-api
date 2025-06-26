import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RevolutService } from './revolut.service';
import { CreateOrderRequestDto } from './dtos/create-order-request.dto';
import { UserDetails } from '../../../decorators';
import { UserPayload } from '../../token/payloads/userPayload.interface';
import { AuthGuard } from '../../../guard';
import { OrderEventDto } from './dtos/order.event';

@Controller('revolut')
export class RevolutController {
  constructor(private readonly revolutService: RevolutService) {}

  @Post()
  @UseGuards(AuthGuard)
  public async redirect(@Body() createOrderRequestDto: CreateOrderRequestDto, @UserDetails() user: UserPayload ) {
    return this.revolutService.createOrder(createOrderRequestDto, user.id);
  }

  @Post('/webhooks')
  public async handleWebhook(@Body() orderEvent: OrderEventDto,) {
    console.log(orderEvent);
    return this.revolutService.handleWebhook(orderEvent);
  }
}
