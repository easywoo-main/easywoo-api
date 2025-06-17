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
      data: data as Prisma.MessageChoiceUncheckedCreateInput
    });
  }

  public async updateMessageChoice(id: string, data: UpdateMessageChoiceDto): Promise<MessageChoiceEntity> {
    return this.messageChoiceRepository.update({
      where: { id },
      data: data as Prisma.MessageChoiceUncheckedUpdateInput
    });
  }

  public async findAllMessageChoiceIdsByGoToStep(goToStep:number, chatId: string) {
    return this.messageChoiceRepository.findMany({where: {goToStep, prevMessage: {chatId}}, select: {id: true}})
  }

}