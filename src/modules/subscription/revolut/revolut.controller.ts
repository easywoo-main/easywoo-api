import { AuthGuard } from '../../../guard';
import { CreateOrderRequestDto } from './dtos/create-order-request.dto';
import { OrderEventDto } from './dtos/order.event';
import { ApiBearerAuth, ApiBody, ApiTags, ApiOperation, ApiResponse, ApiOkResponse } from '@nestjs/swagger';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserDetails } from '../../../decorators';
import { UserPayload } from 'src/modules/token/payloads/userPayload.interface';
import { RevolutService } from './revolut.service';
import { SubscriptionEntity } from '../subscription.entity';
import { RedirectUrlDto } from './dtos/redirectUrl.dto';

@ApiTags('Revolut')
@Controller('revolut')
export class RevolutController {
  constructor(private readonly revolutService: RevolutService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Revolut order and redirect' })
  @ApiOkResponse({type: RedirectUrlDto})
  @UseGuards(AuthGuard)
  public async redirect(
    @Body() createOrderRequestDto: CreateOrderRequestDto,
    @UserDetails() user: UserPayload
  ) {
    return this.revolutService.createOrder(createOrderRequestDto, user.id);
  }

  @Post('/webhooks')
  @ApiOperation({ summary: 'Handle Revolut webhook event' })
  @ApiOkResponse({type: SubscriptionEntity})
  public async handleWebhook(@Body() orderEvent: OrderEventDto) {
    console.log(orderEvent);
    return this.revolutService.handleWebhook(orderEvent);
  }
}