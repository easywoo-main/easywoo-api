import { ForbiddenException, Injectable } from '@nestjs/common';
import { MessageChoiceRepository } from './message-choice.repository';
import { CreateMessageChoiceWithRelationDto } from './dto/createMessageChoiceWithRelation.dto';
import { UpdateMessageChoiceDto } from './dto/updateMessageChoice.dto';
import { CheckExists } from '../../decorators';
import { ChatMessageService } from '../chat-message/chat-message.service';
import { MessageType } from '@prisma/client';
import { PageRequest } from '../../utils/page-request.utils';

@Injectable()
export class MessageChoiceService {
  constructor(
    private readonly messageChoiceRepository: MessageChoiceRepository,
  ) {
  }

  public async createMessageChoice(data: CreateMessageChoiceWithRelationDto) {
    return this.messageChoiceRepository.createMessageChoice(data);
  }

  public async updateMessageChoice(id: string, data: UpdateMessageChoiceDto) {
    return this.messageChoiceRepository.updateMessageChoice(id, data)
  }
}