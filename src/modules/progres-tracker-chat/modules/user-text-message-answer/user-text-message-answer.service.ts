import { Injectable } from '@nestjs/common';
import { CreateUpdateTextMessageAnswerDto } from './dtos/create-update-text-message-answer.dto';
import { UserTextMessageAnswerRepository } from './user-text-message-answer.repository';
import { CreateTextMessageAnswerDto } from './dtos/createTextMessageAnswer.dto';

@Injectable()
export class UserTextMessageAnswerService {
  constructor(
    private readonly userTextMessageAnswerRepository: UserTextMessageAnswerRepository
  ) {
  }

  public async createTextMessageAnswer(data: CreateTextMessageAnswerDto, userId: string) {
    return await this.userTextMessageAnswerRepository.createTextMessageAnswer({...data, userId});
  }
}
