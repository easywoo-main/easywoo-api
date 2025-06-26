import { BadRequestException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { AxiosInstance } from 'axios';
import { CreateOrderRequestDto } from './dtos/create-order-request.dto';
import { ChatService } from '../../chat/chat.service';
import { RevolutCreateOrderResponseDto } from './dtos/revolut-create-order-response.dto';
import { OrderEventDto, OrderEventType } from './dtos/order.event';
import { CANCEL_SUBSCRIPTION_TYPES, CREATE_SUBSCRIPTION_TYPES, PAYMENT_ISSUE_TYPES } from './subscriptionType.utils';
import { RevolutOrderEntity } from './revolut-order.entity';
import { RevolutOrderRepository } from './revolut-order.repository';
import { PaymentPlatform, RevolutOrderType, SubscriptionStatus } from '@prisma/client';
import { SubscriptionService } from '../subscription.service';
import { CheckExists } from '../../../decorators';
import * as process from 'node:process';

@Injectable()
export class RevolutService implements OnModuleInit {
  constructor(@Inject('REVOLUT_CLIENT') private readonly revolutClient: AxiosInstance,
              private readonly revolutOrderRepository: RevolutOrderRepository,
              private readonly chatService: ChatService,
              private readonly subscriptionService: SubscriptionService,) {}

  async onModuleInit() {
    console.log([...CANCEL_SUBSCRIPTION_TYPES, ...CREATE_SUBSCRIPTION_TYPES, ...PAYMENT_ISSUE_TYPES])
  }

  public async createOrder(createOrderDto: CreateOrderRequestDto, userId: string){
    const chat = await this.chatService.findChatById(createOrderDto.chatId);

    const {data: revolutCreateOrderResponseDto} = await this.revolutClient.post<RevolutCreateOrderResponseDto>('/orders', {
      amount: chat.price * 100,
      currency: createOrderDto.currency,
      redirect_url: createOrderDto.redirectUrl,
      metaData: { userId, ...createOrderDto }
    });

    await this.createRevolutOrder({
      id: revolutCreateOrderResponseDto.id,
      userId,
      chatId: createOrderDto.chatId,
      amount: revolutCreateOrderResponseDto.order_amount.value,
      currency: revolutCreateOrderResponseDto.order_amount.currency,
      type: RevolutOrderType.PENDING,
    });

    const redirectUrl = revolutCreateOrderResponseDto.checkout_url

    return { redirectUrl: redirectUrl};
  }

  public async handleWebhook(orderEvent: OrderEventDto){
    const event = orderEvent.event
    if (CREATE_SUBSCRIPTION_TYPES.includes(event)) {
      return this.createSubscription(orderEvent);
    } else if (CANCEL_SUBSCRIPTION_TYPES.includes(event)) {
      return this.cancelSubscription(orderEvent);
    } else if (PAYMENT_ISSUE_TYPES.includes(event)) {
      return this.paymentIssue(orderEvent);
    }
    throw new BadRequestException('Invalid subscription type');
  }


  private async createSubscription(orderEvent: OrderEventDto) {
    const revolutOrder = await this.findRevolutOrderById(orderEvent.order_id);

    return this.subscriptionService.createSubscription({
      userId: revolutOrder.userId,
      chatId: revolutOrder.chatId,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      paymentPlatform: PaymentPlatform.REVOLUT,
      status: SubscriptionStatus.ACTIVE,
      plan: 'UNKNOWN',
    })
  }

  private async createRevolutOrder(revolutOrderEntity: RevolutOrderEntity){
    return this.revolutOrderRepository.createRevolutOrder(revolutOrderEntity);
  }

  @CheckExists("Revolut Order not found")
  private async findRevolutOrderById(id: string){
    return this.revolutOrderRepository.findRevolutOrderById(id)
  }

  private async cancelSubscription(orderEvent: OrderEventDto) {
    return this.revolutOrderRepository.updateRevolutOrder(orderEvent.order_id, {type: RevolutOrderType.CANCELLED})
  }

  private paymentIssue(orderEvent: OrderEventDto) {
    return this.revolutOrderRepository.updateRevolutOrder(orderEvent.order_id, {type: RevolutOrderType.FAILED})
  }
}
