import { Prisma } from "@prisma/client";
import { Repository } from '../../../database/repository.service';
import { RevolutOrderEntity } from './revolut-order.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RevolutOrderRepository {
  private revolutOrderRepository: Prisma.RevolutOrderDelegate;

  constructor(repository: Repository) {
    this.revolutOrderRepository = repository.revolutOrder
  }

  public async createRevolutOrder(revolutOrderEntity: RevolutOrderEntity): Promise<RevolutOrderEntity> {
    return this.revolutOrderRepository.upsert({
      where: {
        userId_chatId: {
          chatId: revolutOrderEntity.chatId,
          userId: revolutOrderEntity.userId
        }
      },
      create: revolutOrderEntity,
      update: revolutOrderEntity
    });  }

  public async updateRevolutOrder(id: string, revolutOrderEntity: Partial<RevolutOrderEntity>): Promise<RevolutOrderEntity> {
    return this.revolutOrderRepository.update({where: {id}, data: revolutOrderEntity});
  }

  public async findRevolutOrderById(id: string): Promise<RevolutOrderEntity> {
    return this.revolutOrderRepository.findUnique({where: {id}})
  }
}