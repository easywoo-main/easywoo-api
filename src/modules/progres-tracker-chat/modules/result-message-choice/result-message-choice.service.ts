import { Injectable } from '@nestjs/common';
import { ResultMessageChoiceRepository } from './result-message-choice.repository';
import { CreateResultMessageChoiceDto } from './dtos/createResultMessageChoice.dto';
import { MessageChoiceService } from 'src/modules/message-choice/message-choice.service';
import { ChatMessageService } from 'src/modules/chat-message/chat-message.service';
import { Success } from '../../../../utils/success.utils';

@Injectable()
export class ResultMessageChoiceService {
  constructor(
    private readonly resultMessageChoiceRepository: ResultMessageChoiceRepository,
  ) {}

  public async createResultMessageChoice(messageChoiceId: string, userId: string) {
    return await this.resultMessageChoiceRepository.createResultMessageChoice({ userId, messageChoiceId });
  }

  public async getResultMessageChoicesByUserId(userId: string) {
    return this.resultMessageChoiceRepository.getResultMessageChoicesByUserId(userId);
  }
}
