import { Injectable } from '@nestjs/common';
import { MessageChoiceRepository } from './message-choice.repository';
import { CreateMessageChoiceWithRelationDto } from './dto/createMessageChoiceWithRelation.dto';
import { UpdateMessageChoiceDto } from './dto/updateMessageChoice.dto';
import { CheckExists } from '../../decorators';

@Injectable()
export class MessageChoiceService {
  constructor(private readonly messageChoiceRepository: MessageChoiceRepository) {}

  public async createMessageChoice(data: CreateMessageChoiceWithRelationDto) {
    return this.messageChoiceRepository.createMessageChoice(data);
  }

  public async updateMessageChoice(id: string, data: Partial<UpdateMessageChoiceDto>) {
    await this.findMessageChoiceById(id);
    return this.messageChoiceRepository.updateMessageChoice(id, data);
  }

  public async deleteMessageChoice(id: string) {
    await this.findMessageChoiceById(id);
    return this.messageChoiceRepository.deleteMessageChoice(id);
  }

  @CheckExists("MessageChoice not found")
  public async findMessageChoiceById(id: string) {
    return this.messageChoiceRepository.findMessageChoiceById(id);
  }

  public async createChallengeMessageChoices(prevMessageId: string) {
    return Promise.all([
      this.createMessageChoice({name: "SUBMITTED_TASK", prevMessageId}),
      this.createMessageChoice({name: "CANCELED_TASK", prevMessageId}),
    ])
  }
}