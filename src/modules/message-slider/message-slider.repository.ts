import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { MessageSliderEntity } from './message-slider.entity';
import { CreateUpdateSliderPropWithRelationDto } from './dto/createUpdateSliderPropWithRelation.dto';

@Injectable()
export class MessageSliderRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createMessageSlider(data: CreateUpdateSliderPropWithRelationDto): Promise<MessageSliderEntity> {
    return this.prisma.sliderProp.create({ data });
  }

  public async findMessageSliderById(id: string): Promise<MessageSliderEntity>  {
    return this.prisma.sliderProp.findUnique({ where: { id } });
  }

  public async findAllMessageSlidersByMessageId(chatMessageId: string): Promise<MessageSliderEntity[]> {
    return this.prisma.sliderProp.findMany({where: {chatMessageId}})
  }

  public async updateMessageSlider(id: string, data: Partial<CreateUpdateSliderPropWithRelationDto>): Promise<MessageSliderEntity> {
    return this.prisma.sliderProp.update({ where: { id }, data });
  }

  public async deleteMessageSlider(id: string): Promise<MessageSliderEntity> {
    return this.prisma.sliderProp.delete({where: {id}})
  }

}
