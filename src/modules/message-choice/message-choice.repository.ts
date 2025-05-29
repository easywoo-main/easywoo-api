import { Injectable } from '@nestjs/common';
import { Repository } from '../../database/repository.service';
import { MessageChoiceEntity } from './messageChoice.entity';
import { CreateMessageChoiceWithRelationDto } from './dto/createMessageChoiceWithRelation.dto';
import { UpdateMessageChoiceDto } from './dto/updateMessageChoice.dto';
import { Prisma } from '.prisma/client';
import { PageRequest } from '../../utils/page-request.utils';

@Injectable()
export class MessageChoiceRepository {
  private readonly messageChoiceRepository: Prisma.MessageChoiceDelegate;
  constructor(repository: Repository) {
    this.messageChoiceRepository = repository.messageChoice
  }
  public async createMessageChoice(data: CreateMessageChoiceWithRelationDto): Promise<MessageChoiceEntity> {
    return this.messageChoiceRepository.create({
      data: data as Prisma.MessageChoiceUncheckedCreateInput
    });
  }

  public async updateMessageChoice(id: string, data: UpdateMessageChoiceDto): Promise<MessageChoiceEntity> {
    return this.messageChoiceRepository.update({
      where: { id },
      data: data as Prisma.MessageChoiceUncheckedUpdateInput
    });
  }

  public async deleteMessageChoice(id: string): Promise<MessageChoiceEntity> {
    return this.messageChoiceRepository.delete({ where: { id } });
  }

  public async findMessageChoiceById(id: string, userIds?: string[]): Promise<MessageChoiceEntity> {
    return this.messageChoiceRepository.findUnique({
      where: { id },
      include: {
        nextMessage: true,
        ...(userIds && { resultMessageChoice: { where: { user: { id: { in: userIds } } } } })
      }
    });
  }

  public async findChoiceWithoutNextId(chatMessageId: string, chatId: string, pageRequest: PageRequest) {
    return this.messageChoiceRepository.findMany({
      where: this.getWhereFilter(chatMessageId, pageRequest.search),
      ...pageRequest.getFilter()
    });
  }

  private getWhereFilter(chatMessageId: string, search: string): Prisma.MessageChoiceWhereInput {
    return {
      prevMessage: { id: chatMessageId },
      ...(search && {
        id: {
          mode: 'insensitive',
          contains: search
        },
        name: {
          mode: 'insensitive',
          contains: search
        },
      })
    };
  }

  public countChoiceWithoutNextId(chatMessageId: string, chatId: string, pageRequest: PageRequest) {
    return this.messageChoiceRepository.count({
      where: this.getWhereFilter(chatMessageId, pageRequest.search)
    });
  }
}