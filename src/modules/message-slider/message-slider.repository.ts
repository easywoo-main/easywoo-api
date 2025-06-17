import { Injectable } from '@nestjs/common';
import { Repository } from '../../database/repository.service';
import { MessageSliderEntity } from './message-slider.entity';
import { CreateUpdateSliderPropDto } from './dto/createUpdateSliderProp.dto';
import { CreateSliderPropDto } from './dto/createSliderProp.dto';
import { Prisma } from '.prisma/client';

@Injectable()
export class MessageSliderRepository {
  private readonly messageSliderRepository: Prisma.SliderPropDelegate;
  constructor(repository: Repository) {
    this.messageSliderRepository = repository.sliderProp
  }

  public async createMessageSlider(data: CreateUpdateSliderPropDto): Promise<MessageSliderEntity> {
    return this.messageSliderRepository.create({ data });
  }

  public async findMessageSliderById(id: string): Promise<MessageSliderEntity>  {
    return this.messageSliderRepository.findUnique({ where: { id } });
  }

  public async findAllMessageSlidersByChatId(chatId: string): Promise<MessageSliderEntity[]> {
    return this.messageSliderRepository.findMany({where: {chatId}})
  }

  public async updateMessageSlider(id: string, data: Partial<CreateUpdateSliderPropDto>): Promise<MessageSliderEntity> {
    return this.messageSliderRepository.update({ where: { id }, data });
  }

  public async deleteMessageSlider(id: string): Promise<MessageSliderEntity> {
    return this.messageSliderRepository.delete({where: {id}})
  }
}
