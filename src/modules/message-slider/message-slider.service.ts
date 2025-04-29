import { Injectable } from '@nestjs/common';
import { MessageSliderRepository } from './message-slider.repository';
import { MessageSliderEntity } from './message-slider.entity';
import { CreateUpdateSliderPropWithRelationDto } from './dto/createUpdateSliderPropWithRelation.dto';
import { CheckExists } from '../../decorators';

@Injectable()
export class MessageSliderService {
  constructor(private readonly messageSliderRepository: MessageSliderRepository) {}

  public async createMessageSlider(data: CreateUpdateSliderPropWithRelationDto): Promise<MessageSliderEntity> {
    return this.messageSliderRepository.createMessageSlider(data);
  }

  @CheckExists("Slider not found")
  public async findMessageSliderById(id: string): Promise<MessageSliderEntity> {
    return this.messageSliderRepository.findMessageSliderById(id);
  }

  public async findAllMessageSlidersByMessageId(chatMessageId: string): Promise<MessageSliderEntity[]> {
    return this.messageSliderRepository.findAllMessageSlidersByMessageId(chatMessageId);
  }

  public async updateMessageSlider(
    id: string,
    data: Partial<CreateUpdateSliderPropWithRelationDto>,
  ): Promise<MessageSliderEntity> {
    await this.findMessageSliderById(id);
    return this.messageSliderRepository.updateMessageSlider(id, data);
  }

  public async deleteMessageSlider(id: string): Promise<MessageSliderEntity> {
    await this.findMessageSliderById(id);
    return this.messageSliderRepository.deleteMessageSlider(id);
  }
}