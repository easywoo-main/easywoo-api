import { Injectable } from '@nestjs/common';
import { Repository } from '../../../../database/repository.service';
import { CreateUpdateTextMessageAnswerDto } from './dtos/create-update-text-message-answer.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserTextMessageAnswerRepository {
  private readonly  userTextMessageAnswerRepository: Prisma.UserTextMessageAnswerDelegate;
  constructor(repository: Repository) {
    this.userTextMessageAnswerRepository = repository.userTextMessageAnswer
  }

  public async createTextMessageAnswer(data: CreateUpdateTextMessageAnswerDto) {
    return this.userTextMessageAnswerRepository.create({
      data
    });
  }
}
