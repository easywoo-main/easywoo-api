import { Injectable } from '@nestjs/common';
import { Repository } from '../../database/repository.service';
import { MessageChoiceEntity } from './messageChoice.entity';
import { CreateMessageChoiceWithRelationDto } from './dto/createMessageChoiceWithRelation.dto';
import { UpdateMessageChoiceDto } from './dto/updateMessageChoice.dto';
import { Prisma } from '.prisma/client';

@Injectable()
export class MessageChoiceRepository {
  private readonly messageChoiceRepository: Prisma.MessageChoiceDelegate;
  constructor(repository: Repository) {
    this.messageChoiceRepository = repository.messageChoice
  }
  public async createMessageChoice(data: CreateMessageChoiceWithRelationDto): Promise<MessageChoiceEntity> {
    return this.messageChoiceRepository.create({
      data
    });
  }

  public async updateMessageChoice(id: string, data: Partial<UpdateMessageChoiceDto>): Promise<MessageChoiceEntity> {
    return this.messageChoiceRepository.update({
      where: { id },
      data
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
}