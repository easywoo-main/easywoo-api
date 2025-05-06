import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { MessageChoiceEntity } from './messageChoice.entity';
import { CreateMessageChoiceWithRelationDto } from './dto/createMessageChoiceWithRelation.dto';
import { UpdateMessageChoiceDto } from './dto/updateMessageChoice.dto';

@Injectable()
export class MessageChoiceRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  public async createMessageChoice({
                                     prevMessageId,
                                     ...data
                                   }: CreateMessageChoiceWithRelationDto): Promise<MessageChoiceEntity> {
    return this.prisma.messageChoice.create({
      data: { ...data, prevMessage: { connect: { id: prevMessageId } } }
    });
  }

  public async updateMessageChoice(id: string, {
    prevMessageId,
    nextMessageId,
    ...data
  }: Partial<UpdateMessageChoiceDto>): Promise<MessageChoiceEntity> {
    return this.prisma.messageChoice.update({
      where: { id },
      data: {
        ...data,
        ...(prevMessageId && {prevMessage: { connect: { id: prevMessageId } }}),
        ...(nextMessageId && {nextMessage: { connect: { id: nextMessageId } }})
      }
    });
  }

  public async deleteMessageChoice(id: string): Promise<MessageChoiceEntity> {
    return this.prisma.messageChoice.delete({ where: { id } });
  }

  public async findMessageChoiceById(id: string): Promise<MessageChoiceEntity> {
    return this.prisma.messageChoice.findUnique({
      where: { id },
      include: {
        nextMessage: true
      }
    });
  }
}
