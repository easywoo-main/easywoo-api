import { Injectable } from '@nestjs/common';
import { ResultMessageChoiceRepository } from './result-message-choice.repository';
import { CreateResultMessageChoiceDto } from './dtos/createResultMessageChoice.dto';

@Injectable()
export class ResultMessageChoiceService {
  constructor(private readonly resultMessageChoiceRepository: ResultMessageChoiceRepository) {
  }

  public async createResultMessageChoice(data: CreateResultMessageChoiceDto, userId: string) {
    return this.resultMessageChoiceRepository.createResultMessageChoice({ userId, ...data });
  }

  public async getResultMessageChoicesByUserId(userId: string) {
    return this.resultMessageChoiceRepository.getResultMessageChoicesByUserId(userId);
  }

}
