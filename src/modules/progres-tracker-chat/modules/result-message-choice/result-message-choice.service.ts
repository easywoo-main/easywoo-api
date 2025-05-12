import { Injectable } from '@nestjs/common';
import { ResultMessageChoiceRepository } from './result-message-choice.repository';
import { PageRequest, PageRequestArgs } from '../../../../utils/pageable.utils';
import { ResultMessageChoiceDto } from './dtos/resultMessageChoice.dto';

@Injectable()
export class ResultMessageChoiceService {
  constructor(
    private readonly resultMessageChoiceRepository: ResultMessageChoiceRepository,
  ) {}

  public async createResultMessageChoice(messageChoiceId: string, userId: string) {
    return await this.resultMessageChoiceRepository.createResultMessageChoice({ userId, messageChoiceId });
  }

  public async getResultMessageChoicesByUserId(messageChoiceId: string, pageRequestArgs: PageRequestArgs) {
    const pageRequest = new PageRequest(pageRequestArgs);
    const [resultMessageChoices, count] = await Promise.all([
      this.resultMessageChoiceRepository.getAllResultMessageChoiceByMessageChoiceId(messageChoiceId, pageRequest),
      this.resultMessageChoiceRepository.getCountResultMessageChoice(messageChoiceId, pageRequest)
    ]);

    return pageRequest.toPageResponse<ResultMessageChoiceDto>(resultMessageChoices, count);
  }
}
