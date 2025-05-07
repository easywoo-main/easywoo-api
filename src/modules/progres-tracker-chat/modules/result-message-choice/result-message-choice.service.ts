import { Injectable } from '@nestjs/common';
import { ResultMessageChoiceRepository } from './result-message-choice.repository';
import { CreateResultMessageChoiceDto } from './dtos/createResultMessageChoice.dto';
import { MessageChoiceService } from 'src/modules/message-choice/message-choice.service';
import { ChatMessageService } from 'src/modules/chat-message/chat-message.service';

@Injectable()
export class ResultMessageChoiceService {
  constructor(
    private readonly resultMessageChoiceRepository: ResultMessageChoiceRepository,
    private readonly messageChoiceService: MessageChoiceService,
    private readonly chatMessageService: ChatMessageService,
  ) {
  }

  public async createResultMessageChoice(data: CreateResultMessageChoiceDto, userId: string) {
    const resultMessageChoice = await this.resultMessageChoiceRepository.createResultMessageChoice({ userId, ...data });
    const messageChoice =  await this.messageChoiceService.findMessageChoiceById(resultMessageChoice.messageChoiceId);
    return await this.chatMessageService.findChatMessagesWithPropsById(messageChoice.nextMessageId);
  }

  public async getResultMessageChoicesByUserId(userId: string) {
    return this.resultMessageChoiceRepository.getResultMessageChoicesByUserId(userId);
  }

}
