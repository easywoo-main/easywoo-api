import { Injectable } from '@nestjs/common';
import { CreateUpdateTextMessageAnswerDto } from './create-update-text-message-answer.dto';
import { UserTextMessageAnswerRepository } from './user-text-message-answer.repository';

@Injectable()
export class UserTextMessageAnswerService {
  constructor(
    private readonly userTextMessageAnswerRepository: UserTextMessageAnswerRepository
  ) {
  }

  public async createTextMessageAnswer(data: CreateUpdateTextMessageAnswerDto) {
    return await this.userTextMessageAnswerRepository.createTextMessageAnswer(data);
  }
}
