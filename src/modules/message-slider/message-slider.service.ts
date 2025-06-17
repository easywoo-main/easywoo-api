import { Injectable } from '@nestjs/common';
import { MessageSliderRepository } from './message-slider.repository';
import { MessageSliderEntity } from './message-slider.entity';
import { CreateUpdateSliderPropDto } from './dto/createUpdateSliderProp.dto';
import { CheckExists } from '../../decorators';
import { CreateSliderPropDto } from './dto/createSliderProp.dto';
import { UpdateSliderPropDto } from './dto/updateSliderProp.dto';

@Injectable()
export class MessageSliderService {
  constructor(private readonly messageSliderRepository: MessageSliderRepository) {
  }

  public async createMessageSlider(data: CreateSliderPropDto): Promise<MessageSliderEntity> {
    return this.messageSliderRepository.createMessageSlider(data);
  }

  public async upsertMessageSlider( messageSlider: CreateUpdateSliderPropDto){
    if(!messageSlider.id){
      return this.createMessageSlider(messageSlider)
    }
    return this.updateMessageSlider(messageSlider.id, messageSlider)
  }

  @CheckExists('Slider not found')
  public async findMessageSliderById(id: string): Promise<MessageSliderEntity> {
    return this.messageSliderRepository.findMessageSliderById(id);
  }

  public async findAllMessageSlidersByChatId(chatId: string): Promise<MessageSliderEntity[]> {
    return this.messageSliderRepository.findAllMessageSlidersByChatId(chatId);
  }

  public async updateMessageSlider(
    id: string,
    data: UpdateSliderPropDto
  ): Promise<MessageSliderEntity> {
    await this.findMessageSliderById(id);
    return this.messageSliderRepository.updateMessageSlider(id, data);
  }

  public async deleteMessageSlider(id: string): Promise<MessageSliderEntity> {
    await this.findMessageSliderById(id);
    return this.messageSliderRepository.deleteMessageSlider(id);
  }
}